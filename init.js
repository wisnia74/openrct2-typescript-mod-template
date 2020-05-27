const path = require('path');
const {
  exec,
  createFile,
  removeFile,
  createFolder,
  removeFolder,
  readJSON,
  createJSON,
} = require('./utils/functions');
const {
  createTypeScriptConfig,
  createNodemonConfig,
  createVsCodeConfig,
  createTemplateModFile,
  createTemplateReadmeMd,
} = require('./utils/generators');

const {
  userName,
  modName,
  modType,
  openrct2ApiFilePath,
  openrct2PluginFolderPath,
} = readJSON('./init.json');

// load necessary scripts and devDependencies from template npm package files
const { scripts, devDependencies } = readJSON('./package.json');

// remove template npm package files and README.md
removeFile('./package.json');
removeFile('./package-lock.json');
removeFile('./README.md');
removeFile('./LICENSE');

// run npm init
exec('npm init');

// read generated package.json, append scripts and devDependencies to new package.json and save it
const newPackageJson = readJSON('./package.json');

newPackageJson.scripts = scripts;
newPackageJson.devDependencies = devDependencies;

createJSON('./package.json', newPackageJson);

// install dependencies
exec('npm install');

// create TypeScript develop and prod config and save them
const tsDevelopConfig = createTypeScriptConfig(`${openrct2PluginFolderPath}/${modName}`);
const tsProdConfig = createTypeScriptConfig(`./dist/${modName}`);

createJSON('./tsconfig-develop.json', tsDevelopConfig);
createJSON('./tsconfig-prod.json', tsProdConfig);

// create and save Nodemon config
const nodemonConfig = createNodemonConfig();

createJSON('./nodemon.json', nodemonConfig);

// create VSCode config and save it to its folder
const vsCodeConfig = createVsCodeConfig();

createFolder('./.vscode');
createJSON('./.vscode/settings.json', vsCodeConfig);

// create temporary mod file and save it to ./src
const modFile = createTemplateModFile(openrct2ApiFilePath, modName, userName, modType);

createFolder('./src');
createFile('./src/mod.ts', modFile);

// create template README.md and save it
const readmeMdText = createTemplateReadmeMd(path.basename(__dirname), 'Happy modding!');

createFile('./README.md', readmeMdText);

// remove utils folder and init configuration file
removeFolder('./utils');
removeFile('./init.json');

// replace init.js with an empty file
createFile('./init.js', '');

// save everything to GitHub
exec('git add .');
exec('git commit -m "Initialize mod file and folder structure"');
exec('git push');
