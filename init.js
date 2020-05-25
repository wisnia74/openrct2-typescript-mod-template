const fs = require('fs');
const { execSync } = require('child_process');

const exec = (cmd, opts = { stdio: [0, 1, 2] }) => execSync(cmd, opts);
const createFile = (pathname, data) => fs.writeFileSync(pathname, data);
const removeFile = (pathname) => fs.unlinkSync(pathname);
const createFolder = (pathname) => fs.mkdirSync(pathname);
const readJSON = (pathname) => JSON.parse(fs.readFileSync(pathname));
const saveJSON = (pathname, data) => fs.writeFileSync(pathname, JSON.stringify(data));

(async () => {
  // load necessary scripts and devDependencies from template npm package files
  const { userName, modName, modType, openrct2ApiFilePath, openrct2PluginFolderPath } = readJSON('./init.json');
  const { scripts, devDependencies } = readJSON('./package.json');

  // remove template npm package files
  removeFile('./package.json');
  removeFile('./package-lock.json');
  removeFile('./README.md');
  removeFile('./LICENSE');

  // run npm init
  exec('npm init');

  // read generated package.json
  const newPackageJson = readJSON('./package.json');

  // append scripts and devDependencies to new package.json
  newPackageJson.scripts = scripts;
  newPackageJson.devDependencies = devDependencies;

  // save new package.json
  saveJSON('./package.json', newPackageJson);

  // install dependencies
  exec('npm install');

  // remove init configuration file
  removeFile('./init.json');

  // create TypeScript develop config
  const tsDevelopConfig = {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "declaration": true,
      "outDir": `${openrct2PluginFolderPath}/${modName}`,
      "strict": true
    },
    "include": ["./src"],
    "exclude": ["node_modules", "**/__tests__/*"]
  }

  // create TypeScript prod config
  const tsProdConfig = {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "declaration": true,
      "outDir": `./dist/${modName}`,
      "strict": true,
      "removeComments": true
    },
    "include": ["./src"],
    "exclude": ["node_modules", "**/__tests__/*"]
  }
  
  // save both TypeScript configs
  saveJSON('./tsconfig-develop.json', tsDevelopConfig);
  saveJSON('./tsconfig-prod.json', tsProdConfig);

  // create Nodemon config
  const nodemonConfig = {
    "events": {
      "restart": "npm run build:develop"
    }
  }
  
  // save Nodemon config
  saveJSON('./nodemon.json', nodemonConfig);

  // create ESLint config
  const eslintConfig = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "no-undef": 0,
        "spaced-comment": 0,
        "max-len": ["error", { "code": 120 }]
    }
  }

  // save ESLint config
  saveJSON('./.eslintrc.json', eslintConfig);

  // create VSCode config
  const vsCodeConfig = {
    "typescript.tsdk": "node_modules/typescript/lib"
  }

  // save VSCode config
  createFolder('./.vscode');
  saveJSON('./.vscode/settings.json', vsCodeConfig);

  // create temporary mod file
  const modFile = `/// <reference path="${openrct2ApiFilePath}" />

  const main = () => {
    console.log('Your plug-in has started!');
  };

  registerPlugin({
    name: '${modName}',
    version: '1.0',
    authors: ['${userName}'],
    type: '${modType}',
    main,
  });
  `

  // save temporary mod file
  createFolder('./src');
  createFile('./src/mod.ts', modFile);

  // save everything to GitHub and remove init files, leaving empty init.js behind
  createFile('./init.js', '');
  exec('git add .');
  exec('git commit -m "Initialize mod file and folder structure"');
  exec('git push');
})();
