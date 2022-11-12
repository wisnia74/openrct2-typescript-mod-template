import './registerCustomPaths';
import type { PathLike } from 'fs';
import { promises as fs } from 'fs';
import { spawn } from 'child_process';
import path from 'path';
import config from '~/config';
import { paths } from '~/utils';

const templateAuthorRegex = /wisnia74/g;

type SearchReplaceValuePair = [string | RegExp, string];

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

const getReplaceData = (): string[] => {
  const match = config.getString('MOD_URL').match(/github.com\/([^/]+)\/([^/]+)/);

  if (!match) throw new Error('Could not match any meaningful information from MOD_URL variable');

  const [cleanModURL, _modAuthor, repoName] = match;

  if (!cleanModURL) throw new Error('Could not match mod URL from MOD_URL variable');
  if (!repoName) throw new Error('Could not match repository name from MOD_URL variable');

  return [cleanModURL, repoName];
};

const replaceDataInFile = async (pathname: PathLike, data: SearchReplaceValuePair[]): Promise<void> => {
  const file = await fs.readFile(pathname);
  let content = file.toString();

  data.forEach(([searchValue, replaceValue]) => {
    content = content.replace(searchValue, replaceValue);
  });

  await fs.writeFile(pathname, content);
};

const replaceDataInFiles = async (): Promise<void> => {
  const filepathsToModify = [
    path.join(paths.github, 'ISSUE_TEMPLATE', 'bug_report.md'),
    path.join(paths.github, 'ISSUE_TEMPLATE', 'feature_request.md'),
  ];

  console.log('Replacing data in files: ', filepathsToModify);

  const modificationPromises = filepathsToModify.map((filepath) =>
    replaceDataInFile(filepath, [[templateAuthorRegex, config.getString('MOD_AUTHOR')]])
  );

  await Promise.all(modificationPromises);
};

const replacePackageJsonData = async (): Promise<void> => {
  const [cleanModURL, repoName] = getReplaceData();
  const filepath = path.join(paths.root, 'package.json');
  const file = await fs.readFile(filepath);
  const parsedFile = JSON.parse(file.toString()) as PackageJSON;

  console.log('Replacing data in package.json...');

  delete parsedFile.scripts.init;
  parsedFile.author = config.getString('MOD_AUTHOR');
  parsedFile.name = repoName;
  parsedFile.homepage = `https://${cleanModURL}#readme`;
  parsedFile.bugs.url = `https://${cleanModURL}/issues`;
  parsedFile.repository.url = `git+https://${cleanModURL}.git`;

  await fs.writeFile(filepath, JSON.stringify(parsedFile, undefined, 2));
};

const replaceAuthorAndYearInLicense = async (): Promise<void> => {
  const filepath = path.join(paths.root, 'LICENSE');
  const file = await fs.readFile(filepath);
  let content = file.toString();

  console.log('Replacing author and year in LICENSE...');

  content = content
    .replace(templateAuthorRegex, config.getString('MOD_AUTHOR'))
    .replace(/2020/, new Date().getFullYear().toString());

  await fs.writeFile(filepath, content);
};

const downloadAndSaveApiDeclarationFile = async (): Promise<void> =>
  new Promise((resolve, reject) => {
    const spawned = spawn('node', [`${path.join(paths.script, 'downloadAndSaveApiDeclarationFile.js')}`]);

    spawned.stderr.pipe(process.stderr);
    spawned.stdout.pipe(process.stdout);

    spawned.on('error', reject);
    spawned.on('close', resolve);
  });

const deleteDirectoriesAndFiles = async (): Promise<void> => {
  const directoriesToDelete = [
    path.join(paths.script, 'init.ts'),
    path.join(paths.script, 'downloadAndSaveApiDeclarationFile.js'),
  ];
  const deletePromises = directoriesToDelete.map((directory) => fs.rm(directory, { recursive: true, force: true }));

  console.log('Deleting unneeded directories and files...');

  await Promise.all(deletePromises);
};

const runNpmInstall = (): Promise<void> =>
  new Promise((resolve, reject) => {
    console.log('Running npm install...');

    const spawned = spawn('npm', ['install'], { shell: true });

    spawned.stderr.pipe(process.stderr);
    spawned.stdout.pipe(process.stdout);

    spawned.on('error', reject);
    spawned.on('close', resolve);
  });

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  await replaceDataInFiles();
  await replacePackageJsonData();
  await replaceAuthorAndYearInLicense();
  await downloadAndSaveApiDeclarationFile();
  await deleteDirectoriesAndFiles();
  await runNpmInstall();

  console.log('Successfully initialized mod template!');
})();
