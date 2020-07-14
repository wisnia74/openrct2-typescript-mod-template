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

module.exports = exports;