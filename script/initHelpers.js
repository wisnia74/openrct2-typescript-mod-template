const {
  readFileSync,
  writeFileSync,
  unlinkSync,
} = require('fs');
const { execSync } = require('child_process');

const readFile = (filePath) => readFileSync(filePath).toString();
const readJsonFile = (filePath) => JSON.parse(readFileSync(filePath));

const saveFile = (filePath, data) => {
  let fileContent;

  if (data instanceof Object) {
    fileContent = JSON.stringify(data, undefined, 2);
  } else {
    fileContent = data;
  }

  writeFileSync(filePath, fileContent);
};

const removeFile = (filePath) => unlinkSync(filePath);
const removeFiles = (filePathList) => {
  for (let x = 0; x < filePathList.length; x += 1) {
    removeFile(filePathList[x]);
  }
};

const replaceModDataInFiles = ({
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
}) => {
  for (let x = 0; x < filePathsToEdit.length; x += 1) {
    const filePath = filePathsToEdit[x];
    const fileContent = readFile(filePath);

    const replacedFileContent = fileContent
      .replace(modNameRegex, modName)
      .replace(modAuthorRegex, modAuthor)
      .replace(templateAuthorRegex, modAuthor)
      .replace(gamePathRegex, gamePath);

    saveFile(filePath, replacedFileContent);
  }
};

const replacePackageJsonContent = ({
  rootDir,
  data: {
    cleanModUrl,
    modAuthor,
    repoName,
  },
}) => {
  const packageJsonPath = `${rootDir}/package.json`;
  const packageJsonContent = readJsonFile(packageJsonPath);

  delete packageJsonContent.scripts.init;
  packageJsonContent.author = modAuthor;
  packageJsonContent.name = repoName;
  packageJsonContent.homepage = `https://${cleanModUrl}#readme`;
  packageJsonContent.bugs.url = `https://${cleanModUrl}/issues`;
  packageJsonContent.repository.url = `git+https://${cleanModUrl}.git`;

  saveFile(packageJsonPath, packageJsonContent);
};

const replaceAuthorAndYearInLicense = ({
  rootDir,
  data: {
    templateAuthorRegex,
    modAuthor,
  },
}) => {
  const licensePath = `${rootDir}/LICENSE`;
  const licenseData = readFile(licensePath);
  const replacedLicenseData = licenseData
    .replace(templateAuthorRegex, modAuthor)
    .replace(/2020/, new Date().getFullYear().toString());

  saveFile(licensePath, replacedLicenseData);
};

const addAndCommitInitResults = () => {
  execSync('git add .');
  execSync('git commit -m "init script"');
};

module.exports = {
  readJsonFile,
  replaceModDataInFiles,
  replacePackageJsonContent,
  replaceAuthorAndYearInLicense,
  removeFiles,
  addAndCommitInitResults,
};
