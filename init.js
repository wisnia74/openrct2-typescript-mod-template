const { readFileSync, writeFileSync, unlinkSync } = require('fs');

const removeFile = (path) => unlinkSync(path);
const readJSON = (path) => JSON.parse(readFileSync(path));
const saveFile = (path, data) => {
  let content;

  if (data instanceof Object) {
    content = JSON.stringify(data, undefined, 2);
  } else {
    content = data;
  }

  writeFileSync(path, content);
};

const { modName, modAuthor, pathToOpenRCT2 } = readJSON('./config.json');

const paths = [
  './rollup.config.dev.js',
  './rollup.config.prod.js',
  './src/registerPlugin.ts',
];

const modNameRegex = /MOD_NAME/g;
const modAuthorRegex = /MOD_AUTHOR/g;
const gamePathRegex = /PATH_TO_OPENRCT2/g;

for (let x = 0; x < paths.length; x += 1) {
  const path = paths[x];
  const content = readFileSync(path).toString();

  const replacedContent = content
    .replace(modNameRegex, modName)
    .replace(modAuthorRegex, modAuthor)
    .replace(gamePathRegex, pathToOpenRCT2);

  saveFile(path, replacedContent);
}

const packageJsonContent = readJSON('./package.json');
delete packageJSON.scripts.init;
saveFile('./package.json', packageJsonContent);

removeFile('./init.js');
