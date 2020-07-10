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
    licence,
    openrct2PluginFolderPath,
    config: {
      pushToGithub,
      importOpenrct2Api,
      compileTemplateMod,
      useStrictMode,
    }
  } = readJSON(`${pathname}/config/init.json`);
  let { openrct2ApiFilePath } = readJSON(`${pathname}/config/init.json`);

  // perform checks
  if (modType !== 'local' && modType !== 'remote') {
    throw new Error('variable modType has to be set to "remote" or "local"');
  }

  if (typeof userName !== 'string') throw new Error('variable userName has to be a string');

  if (typeof modName !== 'string') throw new Error('variable modName has to be a string');

  if (typeof licence !== 'string') throw new Error('variable licence has to be a string');

  if (typeof openrct2PluginFolderPath !== 'string'){
    throw new Error('variable openrct2PluginFolderPath has to be a string');
  }

  if (typeof openrct2ApiFilePath !== 'string') {
    throw new Error('variable openrct2ApiFilePath has to be a string');
  }

  [pushToGithub, importOpenrct2Api, compileTemplateMod, useStrictMode].some((attr) => {
    if (typeof attr !== 'boolean') {
      throw new Error(`all config variables in init.json have to be of type boolean (true/false, no quotes)`);
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
  delete devDependencies.jest

  // remove template files
  removeFile(`${pathname}/package.json`);
  removeFile(`${pathname}/package-lock.json`);
  removeFile(`${pathname}/README.md`);
  removeFile(`${pathname}/LICENSE`);
  removeFile(`${pathname}/demo.gif`);

  // clean npm cache
  exec('npm cache clean --force');

  // run npm init
  exec('npm init');

  // read generated package.json, append scripts and devDependencies to new package.json and save it
  const newPackageJson = readJSON(`${pathname}/package.json`);

  newPackageJson.scripts = scripts;
  newPackageJson.devDependencies = devDependencies;

  removeFile(`${pathname}/package.json`);
  createJSON(`${pathname}/package.json`, newPackageJson);

  // install dependencies
  exec('npm install --force');

  // create TypeScript develop and prod configs and save them
  const tsDevelopConfig = createTypeScriptConfig(`${openrct2PluginFolderPath}/${modName}`, useStrictMode);
  const tsProdConfig = createTypeScriptConfig(`${pathname}/dist/${modName}`, useStrictMode);

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
    ? createTemplateModFile(modName, userName, modType, licence, openrct2ApiFilePath)
    : createTemplateModFile(modName, userName, modType, licence);

  createFolder(`${pathname}/src`);
  createFile(`${pathname}/src/${modName}.ts`, modFile);

  // create template README.md and save it
  const readmeMdText = createTemplateReadmeMd(path.basename(__dirname), 'Happy modding!');

  createFile(`${pathname}/README.md`, readmeMdText);

  // remove utils folder and init configuration file
  removeFolder(`${pathname}/utils`);
  removeFolder(`${pathname}/config`);

  // remove CircleCI folder
  removeFolder(`${pathname}/.circleci`);

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
};

module.exports = exports;
