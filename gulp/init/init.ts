import fs from 'fs';
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

const replaceDataInFile = (pathname: fs.PathLike, data: SearchReplaceValuePair[]): void => {
  const file = fs.readFileSync(pathname).toString();

  data.forEach(([searchValue, replaceValue]) => {
    file.replace(searchValue, replaceValue);
  });

  fs.writeFileSync(pathname, file);
};

const replaceDataInFiles = (): void => {
  const filepathsToModify = [
    path.join(paths.github, 'dependabot.yml'),
    path.join(paths.github, 'ISSUE_TEMPLATE', 'bug_report.md'),
    path.join(paths.github, 'ISSUE_TEMPLATE', 'feature_request.md'),
    path.join(paths.gulp, 'index.ts'),
  ];

  filepathsToModify.forEach((filepath) => {
    replaceDataInFile(filepath, [
      [templateAuthorRegex, config.getString('MOD_AUTHOR')],
      [/\nexport \* from 'init';/, '\n'],
    ]);
  });
};

const replaceAuthorAndYearInLicense = (): void => {
  const filepath = path.join(paths.root, 'LICENSE');
  const file = fs.readFileSync(filepath).toString();

  file
    .replace(templateAuthorRegex, config.getString('MOD_AUTHOR'))
    .replace(/2020/, new Date().getFullYear().toString());

  fs.writeFileSync(filepath, file);
};

const replacePackageJsonData = (): void => {
  const [cleanModURL, repoName] = getReplaceData();
  const filepath = path.join(paths.root, 'package.json');
  const file = JSON.parse(fs.readFileSync(filepath).toString()) as PackageJSON;

  delete file.scripts.init;
  file.author = config.getString('MOD_AUTHOR');
  file.name = repoName;
  file.homepage = `https://${cleanModURL}#readme`;
  file.bugs.url = `https://${cleanModURL}/issues`;
  file.repository.url = `git+https://${cleanModURL}.git`;

  fs.writeFileSync(filepath, JSON.stringify(file, undefined, 2));
};

const deleteDirectories = (): void => {
  const directoriesToDelete = [path.join(paths.gulp, 'init')];

  directoriesToDelete.forEach((directory) => {
    fs.rmSync(directory, { recursive: true, force: true });
  });
};

export default function init(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      replaceDataInFiles();
      replacePackageJsonData();
      replaceAuthorAndYearInLicense();
      deleteDirectories();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
