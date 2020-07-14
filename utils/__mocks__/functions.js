const fs = require('fs');

exports.exec = (cmd) => {
  switch (cmd) {
    case 'npm init':
      fs.writeFileSync(`${__dirname}/../__tests__/test/package.json`, JSON.stringify({
        name: 'test',
        description: 'test',
        version: '1.0.0',
        main: 'index.js',
        scripts: {
          test: 'echo \'Error: no test specified\' && exit 1'
        },
        repository: {
          type: 'git',
          url: 'test'
        },
        keywords: ['test'],
        author: 'test',
        license: 'ISC',
        bugs: {
          url: 'test'
        },
        homepage: 'test'
      } , undefined, 2));
      return undefined;
    default:
      return `executed ${cmd}`;
  }
};

exports.createFile = (pathname, data) => {
  let content;

  if (data instanceof Object) {
    content = JSON.stringify(data, undefined, 2);
  } else {
    content = data;
  }

  fs.writeFileSync(pathname, content);
};

exports.createFiles = (arr) => arr.forEach(([pathname, data]) => this.createFile(pathname, data));

exports.readFile = (pathname) => fs.readFileSync(pathname, 'utf8');

exports.removeFile = (pathname) => fs.unlinkSync(pathname);

exports.removeFiles = (arr) => arr.forEach(pathname => this.removeFile(pathname));

exports.fileExists = (pathname) => fs.existsSync(pathname);

exports.createFolder = (pathname) => fs.mkdirSync(pathname);

exports.createFolders = (arr) => arr.forEach(pathname => this.createFolder(pathname));

exports.removeFolder = (pathname) => {
  if (fs.existsSync(pathname)) {
    fs.readdirSync(pathname).forEach((file) => {
      const currPath = `${pathname}/${file}`;
      if (fs.lstatSync(currPath).isDirectory()) {
        exports.removeFolder(currPath);
      } else {
        fs.unlinkSync(currPath);
      }
    });
    fs.rmdirSync(pathname);
  }
};
exports.removeFolders = (arr) => arr.forEach(pathname => this.removeFolder(pathname));

exports.createJsonFile = (pathname, data) => fs.writeFileSync(pathname, JSON.stringify(data, undefined, 2));

exports.createJsonFiles = (arr) => arr.forEach(([pathname, data]) => this.createJsonFile(pathname, data));

exports.readJSON = (pathname) => JSON.parse(fs.readFileSync(pathname));

module.exports = exports;
