const fs = require('fs');
const { execSync } = require('child_process');

exports.exec = function exec(cmd, opts = { stdio: [0, 1, 2] }) {
  execSync(cmd, opts);
};

exports.createFile = function createFile(pathname, data) {
  fs.writeFileSync(pathname, data);
};

exports.removeFile = function removeFile(pathname) {
  fs.unlinkSync(pathname);
};

exports.createFolder = function createFolder(pathname) {
  fs.mkdirSync(pathname);
};

exports.removeFolder = function removeFolder(pathname) {
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

exports.readJSON = (pathname) => JSON.parse(fs.readFileSync(pathname));

exports.createJSON = function createJSON(pathname, data) {
  fs.writeFileSync(pathname, JSON.stringify(data, undefined, 2));
};

module.exports = exports;
