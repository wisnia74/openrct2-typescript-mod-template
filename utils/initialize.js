const path = require('path');
const { exec } = require('./execSync');
const {
  createFiles,
  removeFile,
  removeFiles,
  createFolder,
  createFolders,
  removeFolders,
  readJSON,
  createJsonFile,
  createJsonFiles,
} = require('./fileHelpers');
const {
  createTypeScriptConfig,
  createNodemonConfig,
  createVsCodeConfig,
  createEslintConfig,
  createTemplateModFile,
  createTemplateReadmeMd,
  createEditorConfig,
} = require('./generators');

exports.init = (pathname) => {
  // load config data from init.json
  const {
    userName,
    modName,
    modType,
    licence,
    openrct2PluginFolderPath,
    config: {
      pushToGithub,
      importOpenrct2Api,
      compileTemplateMod,
      useStrictMode,
    },
  } = readJSON(`${pathname}/config/init.json`);
  let { openrct2ApiFilePath } = readJSON(`${pathname}/config/init.json`);

  // perform checks
  if (modType !== 'local' && modType !== 'remote') {
    throw new Error('variable modType has to be set to "remote" or "local"');
  }

  if (typeof userName !== 'string') throw new Error('variable userName has to be a string');

  if (typeof modName !== 'string') throw new Error('variable modName has to be a string');

  if (modName === '<mod_name>') throw new Error('invalid modName - you can\'t leave it as deafult');

  if (typeof licence !== 'string') throw new Error('variable licence has to be a string');

  if (typeof openrct2PluginFolderPath !== 'string') {
    throw new Error('variable openrct2PluginFolderPath has to be a string');
  }

  if (typeof openrct2ApiFilePath !== 'string') {
    throw new Error('variable openrct2ApiFilePath has to be a string');
  }

  [pushToGithub, importOpenrct2Api, compileTemplateMod, useStrictMode].forEach((attr) => {
    if (typeof attr !== 'boolean') {
      throw new Error('all config variables in init.json have to be of type boolean (true/false, no quotes)');
    }
  });

  if (importOpenrct2Api) {
    if (!openrct2ApiFilePath || openrct2ApiFilePath === 'C:/Users/<user>/Documents/OpenRCT2/bin/openrct2.d.ts') {
      throw new Error('when importOpenrct2Api is set to true, openrct2ApiFilePath has to be defined too');
    }
  } else if (openrct2ApiFilePath === 'C:/Users/<user>/Documents/OpenRCT2/bin/openrct2.d.ts') {
    openrct2ApiFilePath = '';
  }

  // load necessary scripts and devDependencies from template npm package files
  const { scripts, devDependencies } = readJSON(`${pathname}/package.json`);

  // check if they are objects
  if (scripts instanceof Object === false || devDependencies instanceof Object === false) {
    throw new Error('both scripts and devDependencies have to be instances of objects');
  }

  // remove test scripts and dependencies
  delete scripts.test;
  delete scripts['test:dev'];
  delete devDependencies.jest;
  delete devDependencies.codecov;

  // remove template files
  removeFiles([
    `${pathname}/package.json`,
    `${pathname}/package-lock.json`,
    `${pathname}/README.md`,
    `${pathname}/LICENSE`,
    `${pathname}/.nvmrc`,
    `${pathname}/jest.config.js`,
  ]);

  // clean npm cache
  exec('npm cache clean --force');

  // run npm init
  exec('npm init');

  // read generated package.json, append scripts and devDependencies to new package.json and save it
  const newPackageJson = readJSON(`${pathname}/package.json`);

  newPackageJson.scripts = scripts;
  newPackageJson.devDependencies = devDependencies;

  removeFile(`${pathname}/package.json`);
  createJsonFile(`${pathname}/package.json`, newPackageJson);

  // install dependencies
  exec('npm install --force');

  // create configs
  const tsDevelopConfig = createTypeScriptConfig(`${openrct2PluginFolderPath}/${modName}`, useStrictMode);
  const tsProdConfig = createTypeScriptConfig(`${pathname}/dist/${modName}`, useStrictMode);
  const nodemonConfig = createNodemonConfig();
  const vsCodeConfig = createVsCodeConfig();
  const eslintConfig = createEslintConfig();
  const readmeMdText = createTemplateReadmeMd(`Mod template`, 'Happy modding!');
  const editorConfig = createEditorConfig();
  const modFile = importOpenrct2Api
    ? createTemplateModFile(modName, userName, modType, licence, openrct2ApiFilePath)
    : createTemplateModFile(modName, userName, modType, licence);

  // save them to their respective folders and files
  createFolders([
    `${pathname}/.vscode`,
    `${pathname}/src`,
  ]);

  createJsonFiles([
    [`${pathname}/tsconfig-develop.json`, tsDevelopConfig],
    [`${pathname}/tsconfig-prod.json`, tsProdConfig],
    [`${pathname}/nodemon.json`, nodemonConfig],
    [`${pathname}/.vscode/settings.json`, vsCodeConfig],
    [`${pathname}/.eslintrc.json`, eslintConfig],
  ]);

  createFiles([
    [`${pathname}/src/${modName}.ts`, modFile],
    [`${pathname}/README.md`, readmeMdText],
    [`${pathname}/.editorconfig`, editorConfig],
    [`${pathname}/init.js`, ''],
  ]);

  // remove utils, CircleCI, GitHub folder
  removeFolders([
    `${pathname}/utils`,
    `${pathname}/config`,
    `${pathname}/.circleci`,
    `${pathname}/.github`,
  ]);

  // save everything to GitHub
  if (pushToGithub === true) {
    exec('git add .');
    exec('git commit -m "Initialize mod file and folder structure"');
    exec('git push');
  }

  // compile template mod and place it in OpenRCT2 plugin folder
  if (compileTemplateMod === true) {
    createFolder(`${openrct2PluginFolderPath}/${modName}`);
    exec('npm run build:develop');
  }
};

module.exports = exports;
