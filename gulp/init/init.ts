import type { PathLike } from 'fs';
import { promises as fs } from 'fs';
import path from 'path';
import config from '~/config';
import { paths } from '~/utils';

const templateAuthorRegex = /wisnia74(?!\/)/g;

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
  const content = file.toString();

  data.forEach(([searchValue, replaceValue]) => {
    content.replace(searchValue, replaceValue);
  });

  await fs.writeFile(pathname, content);
};

const replaceDataInFiles = async (): Promise<void> => {
  const filepathsToModify = [
    path.join(paths.github, 'dependabot.yml'),
    path.join(paths.github, 'ISSUE_TEMPLATE', 'bug_report.md'),
    path.join(paths.github, 'ISSUE_TEMPLATE', 'feature_request.md'),
    path.join(paths.gulp, 'index.ts'),
  ];

  const modificationPromises = filepathsToModify.map((filepath) =>
    replaceDataInFile(filepath, [
      [templateAuthorRegex, config.getString('MOD_AUTHOR')],
      [/\nexport \* from 'init';/, '\n'],
    ])
  );

  await Promise.all(modificationPromises);
};

const replacePackageJsonData = async (): Promise<void> => {
  const [cleanModURL, repoName] = getReplaceData();
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
};

const replaceAuthorAndYearInLicense = async (): Promise<void> => {
  const filepath = path.join(paths.root, 'LICENSE');
  const file = await fs.readFile(filepath);
  const content = file.toString();

  content
    .replace(templateAuthorRegex, config.getString('MOD_AUTHOR'))
    .replace(/2020/, new Date().getFullYear().toString());

  await fs.writeFile(filepath, content);
};

const deleteDirectories = async (): Promise<void> => {
  const directoriesToDelete = [path.join(paths.gulp, 'init')];
  const deletePromises = directoriesToDelete.map((directory) => fs.rm(directory, { recursive: true, force: true }));

  await Promise.all(deletePromises);
};

export default async function init(): Promise<void> {
  await replaceDataInFiles();
  await replacePackageJsonData();
  await replaceAuthorAndYearInLicense();
  await deleteDirectories();
}
