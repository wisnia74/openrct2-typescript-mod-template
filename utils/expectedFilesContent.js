const modWithoutApi = `const main = () => {
  console.log('Your plug-in has started!');
};

registerPlugin({
  name: 'test',
  version: '1.0',
  authors: ['test'],
  type: 'local',
  licence: 'MIT',
  main,
});
`;

const modWithApi = (pathname) => `/// <reference path="${pathname}/api/openrct2.d.ts" />

const main = () => {
  console.log('Your plug-in has started!');
};

registerPlugin({
  name: 'test',
  version: '1.0',
  authors: ['test'],
  type: 'local',
  licence: 'MIT',
  main,
});
`;

const readme = `# utils

Happy modding!
`;

exports.generate = (pathname) => ({
  expectedModFileContentWithoutApi: modWithoutApi,
  expectedModFileContentWithApi: modWithApi(pathname),
  expectedReadmeContent: readme,
});

module.exports = exports;
