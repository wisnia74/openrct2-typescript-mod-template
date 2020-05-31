const path = require('path');
const {
  exec,
  createFile,
  removeFile,
  createFolder,
  removeFolder,
  readJSON,
  createJSON,
} = require('./functions');
const {
  createTypeScriptConfig,
  createNodemonConfig,
  createVsCodeConfig,
  createEslintConfig,
  createTemplateModFile,
  createTemplateReadmeMd,
} = require('./generators');

exports.init = (pathname) => {
  // load config data from init.json
  const {
    userName,
    modName,
    modType,
    openrct2ApiFilePath,
    openrct2PluginFolderPath,
    config: {
      pushToGithub,
      importOpenrct2Api,
      compileTemplateMod,
    }
  } = readJSON(`${pathname}/init.json`);

  // perform checks
  if (modType !== 'local' && modType !== 'remote') {
    throw new Error('config variable modType has to be set to "remote" or "local"');
  }

  if (typeof userName !== 'string') throw new Error('config variable userName has to be a string');

  if (typeof modName !== 'string') throw new Error('config variable modName has to be a string');

  if (typeof openrct2ApiFilePath !== 'string') {
    throw new Error('config variable openrct2ApiFilePath has to be a string');
  }

  if (typeof openrct2PluginFolderPath !== 'string'){
    throw new Error('config variable openrct2PluginFolderPath has to be a string');
  }

  [pushToGithub, importOpenrct2Api, compileTemplateMod].some((attr) => {
    if (typeof attr !== 'boolean') {
      throw new Error(`all config variables in init.json have to be of type boolean (true/false, no quotes)`);
    }
  });

  // load necessary scripts and devDependencies from template npm package files
  const { scripts, devDependencies } = readJSON(`${pathname}/package.json`);

  // remove template files
  removeFile(`${pathname}/package.json`);
  removeFile(`${pathname}/package-lock.json`);
  removeFile(`${pathname}/README.md`);
  removeFile(`${pathname}/LICENSE`);

  // run npm init
  exec('npm init');

  // read generated package.json, append scripts and devDependencies to new package.json and save it
  const newPackageJson = readJSON(`${pathname}/package.json`);

  newPackageJson.scripts = scripts;
  newPackageJson.devDependencies = devDependencies;

  createJSON(`${pathname}/package.json`, newPackageJson);

  // install dependencies
  exec('npm install');

  // create TypeScript develop and prod config and save them
  const tsDevelopConfig = createTypeScriptConfig(`${openrct2PluginFolderPath}/${modName}`);
  const tsProdConfig = createTypeScriptConfig(`${pathname}/dist/${modName}`);

  createJSON(`${pathname}/tsconfig-develop.json`, tsDevelopConfig);
  createJSON(`${pathname}/tsconfig-prod.json`, tsProdConfig);

  // create and save Nodemon config
  const nodemonConfig = createNodemonConfig();

  createJSON(`${pathname}/nodemon.json`, nodemonConfig);

  // create VSCode config and save it to its folder
  const vsCodeConfig = createVsCodeConfig();

  createFolder(`${pathname}/.vscode`);
  createJSON(`${pathname}/.vscode/settings.json`, vsCodeConfig);

  // create ESLint config and save it
  const eslintConfig = createEslintConfig();

  createJSON(`${pathname}/.eslintrc.json`, eslintConfig);

  // create temporary mod file and save it to ${pathname}/src
  const modFile = importOpenrct2Api
    ? createTemplateModFile(modName, userName, modType, openrct2ApiFilePath)
    : createTemplateModFile(modName, userName, modType);

  createFolder(`${pathname}/src`);
  createFile(`${pathname}/src/${modName}.ts`, modFile);

  // create template README.md and save it
  const readmeMdText = createTemplateReadmeMd(path.basename(__dirname), 'Happy modding!');

  createFile(`${pathname}/README.md`, readmeMdText);

  // remove utils folder and init configuration file
  removeFolder(`${pathname}/utils`);
  removeFile(`${pathname}/init.json`);

  // replace init.js with an empty file
  createFile(`${pathname}/init.js`, '');

  if (pushToGithub === true) {
    // save everything to GitHub
    exec('git add .');
    exec('git commit -m "Initialize mod file and folder structure"');
    exec('git push');
  }

  if (compileTemplateMod === true) {
    // compile template mod and place it in OpenRCT2 plugin folder
    createFolder(`${openrct2PluginFolderPath}/${modName}`);
    exec('npm run build:develop');
  }

  // remove leftover template utilities
  removeFolder(`${pathname}/utils`);

  return undefined;
};

module.exports = exports;
