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

const readme = `# Mod template

Happy modding!
`;

const editorconfig = `root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = false
insert_final_newline = false
`;

exports.generate = (pathname) => ({
  expectedModFileContentWithoutApi: modWithoutApi,
  expectedModFileContentWithApi: modWithApi(pathname),
  expectedReadmeContent: readme,
  expectedEditorconfigContent: editorconfig,
});

module.exports = exports;
