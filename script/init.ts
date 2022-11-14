/* eslint-disable no-console */

import './registerCustomPaths';
import { promises as fs } from 'fs';
import { spawn } from 'child_process';
import path from 'path';
import { paths, Logger } from '~/utils';
import config from '~/config';
import type { PathLike } from 'fs';

const templateAuthorRegex = /wisnia74/g;

type SearchReplaceValuePair = {
  searchFor: string | RegExp;
  replaceWith: string;
};

type PackageJSON = {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: Record<string, string>;
  repository: {
    type: string;
    url: string;
  };
  author: string;
  license: string;
  bugs: {
    url: string;
  };
  homepage: string;
  devDependencies: Record<string, string>;
};

class InitScriptRunner {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  getModData(): { cleanModURL: string; repoName: string } {
    this.logger.info('Getting mod data from config...');

    const match = config.getString('MOD_URL').match(/github.com\/([^/]+)\/([^/]+)/);

    if (!match) throw new Error('Could not match any meaningful information from MOD_URL variable');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cleanModURL, _modAuthor, repoName] = match;

    if (!cleanModURL) throw new Error('Could not match mod URL from MOD_URL variable');
    if (!repoName) throw new Error('Could not match repository name from MOD_URL variable');

    return { cleanModURL, repoName };
  }

  async replaceDataInFile(pathname: PathLike, data: SearchReplaceValuePair[]): Promise<void> {
    this.logger.info(`Replacing data in ${pathname.toString()}...`);

    const file = await fs.readFile(pathname);
    let content = file.toString();

    data.forEach(({ searchFor, replaceWith }) => {
      content = content.replace(searchFor, replaceWith);
    });

    await fs.writeFile(pathname, content);
  }

  async replaceDataInFiles(filepathsToModify: string[], data: SearchReplaceValuePair[]): Promise<void> {
    const modificationPromises = filepathsToModify.map((filepath) => this.replaceDataInFile(filepath, data));

    await Promise.all(modificationPromises);
  }

  async replacePackageJsonData(): Promise<void> {
    this.logger.info('Replacing data in package.json...');

    const { cleanModURL, repoName } = this.getModData();
    const filepath = path.join(paths.root, 'package.json');
    const file = await fs.readFile(filepath);
    const parsedFile = JSON.parse(file.toString()) as PackageJSON;

    delete parsedFile.scripts.init;
    parsedFile.author = config.getString('MOD_AUTHOR');
    parsedFile.name = repoName;
    parsedFile.homepage = `https://${cleanModURL}#readme`;
    parsedFile.bugs.url = `https://${cleanModURL}/issues`;
    parsedFile.repository.url = `git+https://${cleanModURL}.git`;

    await fs.writeFile(filepath, JSON.stringify(parsedFile, undefined, 2));
  }

  async replaceAuthorAndYearInLicense(): Promise<void> {
    this.logger.info('Replacing author and year in LICENSE...');

    const filepath = path.join(paths.root, 'LICENSE');
    const file = await fs.readFile(filepath);
    let content = file.toString();

    content = content
      .replace(templateAuthorRegex, config.getString('MOD_AUTHOR'))
      .replace(/2020/, new Date().getFullYear().toString());

    await fs.writeFile(filepath, content);
  }

  async downloadAndSaveApiDeclarationFile(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.logger.info('Downloading latest OpenRCT2 TypeScript API declaration file...');

      const spawned = spawn('node', [`${path.join(paths.script, 'downloadAndSaveApiDeclarationFile.js')}`]);

      spawned.on('error', reject);
      spawned.on('close', resolve);
    });
  }

  async deleteDirectoriesAndFiles(filepathsToDelete: string[]): Promise<void> {
    this.logger.info('Deleting unneeded directories and files...');

    const deletePromises = filepathsToDelete.map((directory) => fs.rm(directory, { recursive: true, force: true }));

    await Promise.all(deletePromises);
  }

  async runNpmInstall(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.logger.info('Running npm install...');

      const spawned = spawn('npm', ['install'], { shell: true });

      spawned.on('error', reject);
      spawned.on('close', resolve);
    });
  }

  async run(): Promise<void> {
    this.logger.info('Starting...');

    this.logger.timeStart('init');

    await this.replacePackageJsonData();
    await this.replaceAuthorAndYearInLicense();
    await this.replaceDataInFiles(
      [
        path.join(paths.github, 'ISSUE_TEMPLATE', 'bug_report.md'),
        path.join(paths.github, 'ISSUE_TEMPLATE', 'feature_request.md'),
      ],
      [{ searchFor: templateAuthorRegex, replaceWith: config.getString('MOD_AUTHOR') }]
    );
    await this.downloadAndSaveApiDeclarationFile();
    await this.deleteDirectoriesAndFiles([
      path.join(paths.script, 'init.ts'),
      path.join(paths.script, 'downloadAndSaveApiDeclarationFile.js'),
    ]);
    await this.runNpmInstall();

    this.logger.success(`Finished in: ${this.logger.timeEnd('init')}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  await new InitScriptRunner(new Logger({ name: 'init-script', output: console })).run();
})();
