const fs = require('fs');
const { execSync } = require('child_process');

exports.exec = (cmd, opts = { stdio: [0, 1, 2] }) => {
  execSync(cmd, opts);
  return undefined;
};

exports.createFile = (pathname, data) => {
  fs.writeFileSync(pathname, data);
  return undefined;
};

exports.removeFile = (pathname) => {
  fs.unlinkSync(pathname);
  return undefined;
};

exports.createFolder = (pathname) => {
  fs.mkdirSync(pathname);
  return undefined;
};

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

exports.readJSON = (pathname) => JSON.parse(fs.readFileSync(pathname));

exports.createJSON = (pathname, data) => {
  fs.writeFileSync(pathname, JSON.stringify(data, undefined, 2));
  return undefined;
};

module.exports = exports;
