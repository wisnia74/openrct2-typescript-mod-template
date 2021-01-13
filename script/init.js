const rootDir = require('../app');
const {
  readJsonFile,
  replaceModDataInFiles,
  replacePackageJsonContent,
  replaceAuthorAndYearInLicense,
  removeFiles,
  addAndCommitInitResults,
} = require('./initHelpers');

const { modName, modUrl, gamePath } = readJsonFile(`${rootDir}/config.json`);
const [cleanModUrl, modAuthor, repoName] = modUrl.match(/github.com\/([^/]+)\/([^/]+)/);

const modNameRegex = /MOD_NAME/g;
const modAuthorRegex = /MOD_AUTHOR/g;
const templateAuthorRegex = /wisnia74(?!\/)/g;
const gamePathRegex = /PATH_TO_OPENRCT2/g;

const filePathsToEdit = [
  `${rootDir}/.github/dependabot.yml`,
  `${rootDir}/.github/ISSUE_TEMPLATE/bug_report.md`,
  `${rootDir}/.github/ISSUE_TEMPLATE/feature_request.md`,
  `${rootDir}/rollup.config.dev.js`,
  `${rootDir}/rollup.config.prod.js`,
  `${rootDir}/src/registerPlugin.ts`,
];

const filePathsToRemove = [
  `${rootDir}/config.json`,
  `${rootDir}/script/init.js`,
  `${rootDir}/script/initHelpers.js`,
  `${rootDir}/lib/README.md`,
];

replaceModDataInFiles({
  filePathsToEdit,
  data: {
    modNameRegex,
    modName,
    modAuthorRegex,
    modAuthor,
    gamePathRegex,
    gamePath,
    templateAuthorRegex,
  },
});

replacePackageJsonContent({
  rootDir,
  data: {
    cleanModUrl,
    modAuthor,
    repoName,
  },
});

replaceAuthorAndYearInLicense({
  rootDir,
  data: {
    templateAuthorRegex,
    modAuthor,
  },
});

removeFiles(filePathsToRemove);

addAndCommitInitResults();
