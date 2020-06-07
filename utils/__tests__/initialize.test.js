jest.mock('../functions');

const testPath = `${__dirname}/test`;
let packageJsonData;
let initJsonData;

beforeEach(() => {
  const { createFolder, createFile } = require('../functions');

  createFolder(testPath);
  createFolder(`${testPath}/src`);
  createFolder(`${testPath}/utils`);
  createFolder(`${testPath}/api`);
  createFolder(`${testPath}/plugin`);

  createFile(`${testPath}/package-lock.json`);
  createFile(`${testPath}/README.md`);
  createFile(`${testPath}/LICENSE`);

  createFile(`${testPath}/init.js`, 'const test = () => \'test\'');
  createFile(`${testPath}/api/openrct2.d.ts`);

  initJsonData = {
    userName: 'test',
    modName: 'test',
    modType: 'local',
    openrct2ApiFilePath: `${testPath}/api/openrct2.d.ts`,
    openrct2PluginFolderPath: `${testPath}/plugin`,
    config: {
      pushToGithub: false,
      importOpenrct2Api: false,
      compileTemplateMod: false,
      useStrictMode: false,
    },
  };

  packageJsonData = {
    scripts: {
      test1: 'test1',
      test2: 'test2',
    },
    devDependencies: {
      test1: 'test1',
      test2: 'test2',
    }
  };
});

describe('init function', () => {
  describe('invoked when init.json doesn\'t exist', () => {
    it('should throw', () => {
      const { init } = require('../initialize');

      expect(() => {
        init(testPath);
      }).toThrow(new Error(`ENOENT: no such file or directory, open '${testPath}/init.json'`));
    });
  });

  describe('invoked when init.json exists but it\'s empty', () => {
    it('should throw', () => {
      const { init } = require('../initialize');
      const { createJSON } = require('../functions');

      createJSON(`${testPath}/init.json`, {});

      expect(() => {
        init(testPath);
      }).toThrow(Error);
    });
  });

  describe('invoked when init.json exists', () => {
    describe('and modType variable', () => {
      const checkAgainst = [0, 'test', null, undefined, false, [], {}, () => {}];

      describe.each(checkAgainst)('is %p instead of "local"/"remote"', (val) => {
        it('should throw', () => {
          const { init } = require('../initialize');
          const { createJSON } = require('../functions');
          
          initJsonData.modType = val;

          createJSON(`${testPath}/init.json`, initJsonData);

          expect(() => {
            init(testPath);
          }).toThrow(new Error('variable modType has to be set to "remote" or "local"'));
        });
      });
    });

    describe('and userName variable', () => {
      const checkAgainst = [0, null, undefined, false, [], {}, () => {}];

      describe.each(checkAgainst)('is %p instead of a string', (val) => {
        it('should throw', () => {
          const { init } = require('../initialize');
          const { createJSON } = require('../functions');
          
          initJsonData.userName = val;

          createJSON(`${testPath}/init.json`, initJsonData);

          expect(() => {
            init(testPath);
          }).toThrow(new Error('variable userName has to be a string'));
        });
      });
    });

    describe('and modName variable', () => {
      const checkAgainst = [0, null, undefined, false, [], {}, () => {}];

      describe.each(checkAgainst)('is %p instead of a string', (val) => {
        it('should throw', () => {
          const { init } = require('../initialize');
          const { createJSON } = require('../functions');
          
          initJsonData.modName = val;

          createJSON(`${testPath}/init.json`, initJsonData);

          expect(() => {
            init(testPath);
          }).toThrow(new Error('variable modName has to be a string'));
        });
      });
    });

    describe('and openrct2ApiFilePath variable', () => {
      const checkAgainst = [0, null, undefined, false, [], {}, () => {}];

      describe.each(checkAgainst)('is %p instead of a string', (val) => {
        it('should throw', () => {
          const { init } = require('../initialize');
          const { createJSON } = require('../functions');
          
          initJsonData.openrct2ApiFilePath = val;

          createJSON(`${testPath}/init.json`, initJsonData);

          expect(() => {
            init(testPath);
          }).toThrow(new Error('variable openrct2ApiFilePath has to be a string'));
        });
      });
    });

    describe('and openrct2PluginFolderPath variable', () => {
      const checkAgainst = [0, null, undefined, false, [], {}, () => {}];

      describe.each(checkAgainst)('is %p instead of a string', (val) => {
        it('should throw', () => {
          const { init } = require('../initialize');
          const { createJSON } = require('../functions');
          
          initJsonData.openrct2PluginFolderPath = val;

          createJSON(`${testPath}/init.json`, initJsonData);

          expect(() => {
            init(testPath);
          }).toThrow(new Error('variable openrct2PluginFolderPath has to be a string'));
        });
      });
    });

    describe('and config.pushToGithub variable', () => {
      const checkAgainst = [0, 'test', null, undefined, [], {}, () => {}];

      describe.each(checkAgainst)('is %p instead of a boolean', (val) => {
        it('should throw', () => {
          const { init } = require('../initialize');
          const { createJSON } = require('../functions');

          initJsonData.config.pushToGithub = val;

          createJSON(`${testPath}/init.json`, initJsonData);

          expect(() => {
            init(testPath);
          }).toThrow(new Error('all config variables in init.json have to be of type boolean (true/false, no quotes)'));
        });
      });
    });

    describe('and config.importOpenrct2Api variable', () => {
      const checkAgainst = [0, 'test', null, undefined, [], {}, () => {}];

      describe.each(checkAgainst)('is %p instead of a boolean', (val) => {
        it('should throw', () => {
          const { init } = require('../initialize');
          const { createJSON } = require('../functions');

          initJsonData.config.importOpenrct2Api = val;

          createJSON(`${testPath}/init.json`, initJsonData);

          expect(() => {
            init(testPath);
          }).toThrow(new Error('all config variables in init.json have to be of type boolean (true/false, no quotes)'));
        });
      });
    });

    describe('and config.compileTemplateMod variable', () => {
      const checkAgainst = [0, 'test', null, undefined, [], {}, () => {}];

      describe.each(checkAgainst)('is %p instead of a boolean', (val) => {
        it('should throw', () => {
          const { init } = require('../initialize');
          const { createJSON } = require('../functions');

          initJsonData.config.compileTemplateMod = val;

          createJSON(`${testPath}/init.json`, initJsonData);

          expect(() => {
            init(testPath);
          }).toThrow(new Error('all config variables in init.json have to be of type boolean (true/false, no quotes)'));
        });
      });
    });

    describe('and config.useStrictMode variable', () => {
      const checkAgainst = [0, 'test', null, undefined, [], {}, () => {}];

      describe.each(checkAgainst)('is %p instead of a boolean', (val) => {
        it('should throw', () => {
          const { init } = require('../initialize');
          const { createJSON } = require('../functions');

          initJsonData.config.useStrictMode = val;

          createJSON(`${testPath}/init.json`, initJsonData);

          expect(() => {
            init(testPath);
          }).toThrow(new Error('all config variables in init.json have to be of type boolean (true/false, no quotes)'));
        });
      });
    });
  });

  describe('invoked when package.json doesn\'t exist', () => {
    it('should throw', () => {
      const { init } = require('../initialize');
      const { createJSON } = require('../functions');
      
      createJSON(`${testPath}/init.json`, initJsonData);

      expect(() => {
        init(testPath);
      }).toThrow();
    });
  });

  describe('invoked when package.json exists', () => {
    describe('but it\'s empty', () => {
      it('should throw', () => {
        const { init } = require('../initialize');
        const { createJSON } = require('../functions');
        
        createJSON(`${testPath}/init.json`, initJsonData);
        createJSON(`${testPath}/package.json`, {});

        expect(() => {
          init(testPath);
        }).toThrow(new Error('both scripts and devDependencies have to be instances of objects'));
      });
    });
  });

  describe('invoked when package-lock.json doesn\'t exist', () => {
    it('should throw', () => {
      const { init } = require('../initialize');
      const { createJSON, removeFile } = require('../functions');
      
      createJSON(`${testPath}/init.json`, initJsonData);
      createJSON(`${testPath}/package.json`, packageJsonData);

      removeFile(`${testPath}/package-lock.json`);

      expect(() => {
        init(testPath);
      }).toThrow();
    });
  });

  describe('invoked when README.md doesn\'t exist', () => {
    it('should throw', () => {
      const { init } = require('../initialize');
      const { createJSON, removeFile } = require('../functions');
      
      createJSON(`${testPath}/init.json`, initJsonData);
      createJSON(`${testPath}/package.json`, packageJsonData);

      removeFile(`${testPath}/README.md`);

      expect(() => {
        init(testPath);
      }).toThrow();
    });
  });

  describe('invoked when LICENSE doesn\'t exist', () => {
    it('should throw', () => {
      const { init } = require('../initialize');
      const { createJSON, removeFile } = require('../functions');
      
      createJSON(`${testPath}/init.json`, initJsonData);
      createJSON(`${testPath}/package.json`, packageJsonData);

      removeFile(`${testPath}/LICENSE`);

      expect(() => {
        init(testPath);
      }).toThrow();
    });
  });

  describe('when given all required data in correct format', () => {
    it('should not throw', () => {
      const { init } = require('../initialize');
      const { createJSON, removeFolder } = require('../functions');

      createJSON(`${testPath}/init.json`, initJsonData);
      createJSON(`${testPath}/package.json`, packageJsonData);

      removeFolder(`${testPath}/src`);

      expect(() => {
        init(testPath);
      }).not.toThrow();
    });

    it('should create new package.json', () => {
      const { init } = require('../initialize');
      const { createJSON, readJSON, removeFolder } = require('../functions');

      createJSON(`${testPath}/init.json`, initJsonData);
      createJSON(`${testPath}/package.json`, packageJsonData);

      removeFolder(`${testPath}/src`);

      init(testPath);

      const file = readJSON(`${testPath}/package.json`);

      expect(file).toStrictEqual({
        name: 'test',
        description: 'test',
        version: '1.0.0',
        main: 'index.js',
        scripts: {
          test1: 'test1',
          test2: 'test2',
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
        homepage: 'test',
        devDependencies: {
          test1: 'test1',
          test2: 'test2',
        },
      });
    });

    it('should create TypeScript config', () => {
      const { init } = require('../initialize');
      const { createJSON, readJSON, removeFolder } = require('../functions');

      createJSON(`${testPath}/init.json`, initJsonData);
      createJSON(`${testPath}/package.json`, packageJsonData);

      removeFolder(`${testPath}/src`);

      init(testPath);

      const file = readJSON(`${testPath}/package.json`);

      expect(file).toStrictEqual({
        name: 'test',
        description: 'test',
        version: '1.0.0',
        main: 'index.js',
        scripts: {
          test1: 'test1',
          test2: 'test2',
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
        homepage: 'test',
        devDependencies: {
          test1: 'test1',
          test2: 'test2',
        },
      });
    });
  });
});

afterEach(() => {
  const { removeFolder } = require('../functions');

  removeFolder(testPath);
});
