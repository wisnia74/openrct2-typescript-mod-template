import config from 'config';
import path from 'path';
import * as Utils from './utils';

const getModName = (): string => {
  if (!config.modName) throw new Error('--modName flag is missing');
  if (typeof config.modName !== 'string') throw new Error('value for --modName flag has to be a string');

  return config.modName;
};

const getModUrl = (): string => {
  if (!config.modUrl) throw new Error('--modUrl flag is missing');
  if (typeof config.modUrl !== 'string') throw new Error('value for --modUrl flag has to be a string');

  return config.modUrl;
};

const getGamePath = (): string => {
  if (!config.gamePath) throw new Error('--gamePath flag is missing');
  if (typeof config.gamePath !== 'string') throw new Error('value for --gamePath flag has to be a string');

  return config.gamePath;
};

const getDataMatchedFromModUrl = (modUrl: string): RegExpMatchArray => {
  const modUrlMatchResult = modUrl.match(/github.com\/([^/]+)\/([^/]+)/);

  if (!modUrlMatchResult)
    throw new Error("Couldn't retrieve clean mod URL, author name and repository name from modUrl");

  return modUrlMatchResult;
};

const init = (): void => {
  const modName = getModName();
  const modUrl = getModUrl();
  const gamePath = getGamePath();
  const [cleanModUrl, modAuthor, repositoryName] = getDataMatchedFromModUrl(modUrl);

  const modNameRegex = /MOD_NAME/g;
  const modAuthorRegex = /MOD_AUTHOR/g;
  const templateAuthorRegex = /(?<!https:\/\/github\.com\/)wisnia74(?!\/openrct2-typescript-mod-template)/g;
  const gamePathRegex = /PATH_TO_OPENRCT2/g;

  const filePathsToEdit = [
    path.join(config.paths.root, '.github', 'dependabot.yml'),
    path.join(config.paths.root, '.github', 'ISSUE_TEMPLATE', 'bug_report.md'),
    path.join(config.paths.root, '.github', 'ISSUE_TEMPLATE', 'feature_request.md'),
    path.join(config.paths.root, 'rollup.config.dev.ts'),
    path.join(config.paths.root, 'rollup.config.prod.ts'),
    path.join(config.paths.src, 'registerPlugin.ts'),
  ];

  Utils.replaceTextInFiles(filePathsToEdit, [
    {
      searchValue: modNameRegex,
      replaceValue: modName,
    },
    {
      searchValue: modAuthorRegex,
      replaceValue: modAuthor,
    },
    {
      searchValue: gamePathRegex,
      replaceValue: gamePath,
    },
    {
      searchValue: templateAuthorRegex,
      replaceValue: modAuthor,
    },
  ]);
};

init();
