beforeEach(() => {
  const { createFolder } = require('../functions');
  createFolder(`${__dirname}/test`);
});

describe('init function', () => {
  describe('invoked when init.json doesn\'t exist', () => {
    it('should throw', () => {
      const { init } = require('../initialize');

      expect(() => {
        init(`${__dirname}/test`);
      }).toThrow(new Error(`ENOENT: no such file or directory, open '${__dirname}/test/init.json'`));
    });
  });

  describe('invoked when init.json exists but it\'s empty', () => {
    it('should throw', () => {
      const { init } = require('../initialize');
      const { createJSON } = require('../functions');

      createJSON(`${__dirname}/test/init.json`, {});

      expect(() => {
        init(`${__dirname}/test`);
      }).toThrow(Error);
    });
  });

  describe('invoked when init.json exists and', () => {
    describe('modType variable', () => {
      describe('is not equal to "local" or "remote"', () => {
        it('should throw', () => {
          const { init } = require('../initialize');
          const { createJSON } = require('../functions');

          createJSON(`${__dirname}/test/init.json`, {
            userName: 'test',
            modName: 'test',
            modType: null,
            openrct2ApiFilePath: 'test',
            openrct2PluginFolderPath: 'test',
            config: {
              pushToGithub: false,
              importOpenrct2Api: false,
              compileTemplateMod: false,
              useStrictMode: false,
            },
          });

          expect(() => {
            init(`${__dirname}/test`);
          }).toThrow(new Error('config variable modType has to be set to "remote" or "local"'));
        });
      });
    });

    describe('userName variable', () => {
      describe('is not a string', () => {
        it('should throw', () => {
          const { init } = require('../initialize');
          const { createJSON } = require('../functions');

          createJSON(`${__dirname}/test/init.json`, {
            userName: null,
            modName: 'test',
            modType: 'local',
            openrct2ApiFilePath: 'test',
            openrct2PluginFolderPath: 'test',
            config: {
              pushToGithub: false,
              importOpenrct2Api: false,
              compileTemplateMod: false,
              useStrictMode: false,
            },
          });

          expect(() => {
            init(`${__dirname}/test`);
          }).toThrow(new Error('config variable userName has to be a string'));
        });
      });
    });
  });
});

afterEach(() => {
  const { removeFolder } = require('../functions');
  removeFolder(`${__dirname}/test`);
});
