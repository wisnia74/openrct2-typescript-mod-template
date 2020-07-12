jest.mock('../functions');

const { 
  describe,
  beforeEach,
  afterEach,
  expect,
  it
} = require('@jest/globals');
const { createFolder } = require('../__mocks__/functions');
const testPath = `${__dirname}/test`;
const expectedModFileContentWithoutApi = `const main = () => {
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
const expectedModFileContentWithApi = `/// <reference path="${testPath}/api/openrct2.d.ts" />

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
const expectedReadmeContent = `# utils

Happy modding!
`;

let packageJsonData;
let initJsonData;

beforeEach(() => {
  const { createFolder, createFile } = require('../functions');

  createFolder(testPath);
  createFolder(`${testPath}/src`);
  createFolder(`${testPath}/utils`);
  createFolder(`${testPath}/api`);
  createFolder(`${testPath}/plugin`);
  createFolder(`${testPath}/.circleci`);

  createFile(`${testPath}/package-lock.json`, {});
  createFile(`${testPath}/README.md`, '');
  createFile(`${testPath}/LICENSE`, '');
  createFile(`${testPath}/demo.gif`, '');

  createFile(`${testPath}/init.js`, 'const test = () => \'test\'');
  createFile(`${testPath}/api/openrct2.d.ts`, '');
  createFile(`${testPath}/.circleci/config.yml`, '');

  initJsonData = {
    userName: 'test',
    modName: 'test',
    modType: 'local',
    licence: 'MIT',
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
      test: 'test',
      'test:dev': 'test',
      test1: 'test1',
      test2: 'test2',
    },
    devDependencies: {
      jest: 'jest',
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
      }).toThrow(new Error(`ENOENT: no such file or directory, open '${testPath}/config/init.json'`));
    });
  });

  describe('invoked when init.json exists but it\'s empty', () => {
    it('should throw', () => {
      const { init } = require('../initialize');
      const { createJSON } = require('../functions');

      createFolder(`${testPath}/config`);
      createJSON(`${testPath}/config/init.json`, {});

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

          createFolder(`${testPath}/config`);
          createJSON(`${testPath}/config/init.json`, initJsonData);

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

          createFolder(`${testPath}/config`);
          createJSON(`${testPath}/config/init.json`, initJsonData);

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

          createFolder(`${testPath}/config`);
          createJSON(`${testPath}/config/init.json`, initJsonData);

          expect(() => {
            init(testPath);
          }).toThrow(new Error('variable modName has to be a string'));
        });
      });
    });

    describe('and licence variable', () => {
      const checkAgainst = [0, null, undefined, false, [], {}, () => {}];

      describe.each(checkAgainst)('is %p instead of a string', (val) => {
        it('should throw', () => {
          const { init } = require('../initialize');
          const { createJSON } = require('../functions');
          
          initJsonData.licence = val;

          createFolder(`${testPath}/config`);
          createJSON(`${testPath}/config/init.json`, initJsonData);

          expect(() => {
            init(testPath);
          }).toThrow(new Error('variable licence has to be a string'));
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

          createFolder(`${testPath}/config`);
          createJSON(`${testPath}/config/init.json`, initJsonData);

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

          createFolder(`${testPath}/config`);
          createJSON(`${testPath}/config/init.json`, initJsonData);

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

          createFolder(`${testPath}/config`);
          createJSON(`${testPath}/config/init.json`, initJsonData);

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

          createFolder(`${testPath}/config`);
          createJSON(`${testPath}/config/init.json`, initJsonData);

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

          createFolder(`${testPath}/config`);
          createJSON(`${testPath}/config/init.json`, initJsonData);

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

          createFolder(`${testPath}/config`);
          createJSON(`${testPath}/config/init.json`, initJsonData);

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

      createFolder(`${testPath}/config`);
      createJSON(`${testPath}/config/init.json`, initJsonData);

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

        createFolder(`${testPath}/config`);
        createJSON(`${testPath}/config/init.json`, initJsonData);
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

      createFolder(`${testPath}/config`);
      createJSON(`${testPath}/config/init.json`, initJsonData);
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

      createFolder(`${testPath}/config`);
      createJSON(`${testPath}/config/init.json`, initJsonData);
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

      createFolder(`${testPath}/config`);
      createJSON(`${testPath}/config/init.json`, initJsonData);
      createJSON(`${testPath}/package.json`, packageJsonData);

      removeFile(`${testPath}/LICENSE`);

      expect(() => {
        init(testPath);
      }).toThrow();
    });
  });

  describe('when given all required data in correct format', () => {
    const setup = () => {
      const { createJSON, removeFolder } = require('../functions');

      createFolder(`${testPath}/config`);
      createJSON(`${testPath}/config/init.json`, initJsonData);
      createJSON(`${testPath}/package.json`, packageJsonData);

      removeFolder(`${testPath}/src`);
    };

    it('should not throw', () => {
      const { init } = require('../initialize');

      setup();

      expect(() => {
        init(testPath);
      }).not.toThrow();
    });

    it('should create new package.json', () => {
      const { init } = require('../initialize');
      const { readJSON } = require('../functions');

      setup();

      init(testPath);

      const content = readJSON(`${testPath}/package.json`);

      expect(content).toStrictEqual({
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

    it('should create develop TypeScript config', () => {
      const { init } = require('../initialize');
      const { readJSON } = require('../functions');

      setup();

      init(testPath);

      const content = readJSON(`${testPath}/tsconfig-develop.json`);

      expect(content).toStrictEqual({
        "compilerOptions": {
          "target": 'es5',
          "module": 'commonjs',
          "declaration": true,
          "outDir": `${testPath}/plugin/test`,
          "strict": false,
        },
        "include": ['./src'],
        "exclude": ['node_modules', '**/__tests__/*'],
      });
    });

    it('should create prod TypeScript config', () => {
      const { init } = require('../initialize');
      const { readJSON } = require('../functions');

      setup();

      init(testPath);

      const content = readJSON(`${testPath}/tsconfig-prod.json`);

      expect(content).toStrictEqual({
        "compilerOptions": {
          "target": 'es5',
          "module": 'commonjs',
          "declaration": true,
          "outDir": `${testPath}/dist/test`,
          "strict": false,
        },
        "include": ['./src'],
        "exclude": ['node_modules', '**/__tests__/*'],
      });
    });

    it('should create Nodemon config', () => {
      const { init } = require('../initialize');
      const { readJSON, fileExists } = require('../functions');

      setup();

      init(testPath);

      const exists = fileExists(`${testPath}/.vscode`);
      const content = readJSON(`${testPath}/.vscode/settings.json`);

      expect(exists).toStrictEqual(true);
      expect(content).toStrictEqual({
        "typescript.tsdk": "node_modules/typescript/lib",
    });
    });

    it('should create VSCode config', () => {
      const { init } = require('../initialize');
      const { readJSON } = require('../functions');

      setup();

      init(testPath);

      const content = readJSON(`${testPath}/nodemon.json`);

      expect(content).toStrictEqual({
        "events": {
          "restart": 'npm run build:develop',
        },
      });
    });

    it('should create ESLint config', () => {
      const { init } = require('../initialize');
      const { readJSON } = require('../functions');

      setup();

      init(testPath);

      const content = readJSON(`${testPath}/.eslintrc.json`);

      expect(content).toStrictEqual({
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
      });
    });

    describe('if importOpenrct2Api', () => {
      describe('was set to true', () => {
        describe('and openrct2ApiFilePath was left as default', () => {
          it('should throw', () => {
            const { init } = require('../initialize');
            
            initJsonData.openrct2ApiFilePath = 'C:/Users/<user>/Documents/OpenRCT2/bin/openrct2.d.ts';
            initJsonData.config.importOpenrct2Api = true;

            setup();
    
            expect(() => {
              init(testPath);
            }).toThrow(new Error('when importOpenrct2Api is set to true, openrct2ApiFilePath has to be defined too'));
          });
        });

        describe('and openrct2ApiFilePath was left as an empty string', () => {
          it('should throw', () => {
            const { init } = require('../initialize');
            
            initJsonData.openrct2ApiFilePath = '';
            initJsonData.config.importOpenrct2Api = true;

            setup();
    
            expect(() => {
              init(testPath);
            }).toThrow(new Error('when importOpenrct2Api is set to true, openrct2ApiFilePath has to be defined too'));
          });
        });

        it('it should create template mod file in ./src, that has API imported', () => {
          const { init } = require('../initialize');
          const { readFile, fileExists } = require('../functions');
  
          initJsonData.config.importOpenrct2Api = true;
  
          setup();
  
          init(testPath);
  
          const exists = fileExists(`${testPath}/src`);
          const content = readFile(`${testPath}/src/test.ts`);
  
          expect(exists).toStrictEqual(true);
          expect(content).toStrictEqual(expectedModFileContentWithApi);
        });
      });

      describe('was set to false', () => {
        describe('and openrct2ApiFilePath was left as default', () => {
          it('should not throw', () => {
            const { init } = require('../initialize');
            
            initJsonData.openrct2ApiFilePath = 'C:/Users/<user>/Documents/OpenRCT2/bin/openrct2.d.ts';
            initJsonData.config.importOpenrct2Api = false;

            setup();
    
            expect(() => {
              init(testPath);
            }).not.toThrow();
          });
        });

        it('it should create template mod file in ./src, that doesn\'t have API imported', () => {
          const { init } = require('../initialize');
          const { readFile, fileExists } = require('../functions');
          
          initJsonData.config.importOpenrct2Api = false;

          setup();
  
          init(testPath);
  
          const exists = fileExists(`${testPath}/src`);
          const content = readFile(`${testPath}/src/test.ts`);
  
          expect(exists).toStrictEqual(true);
          expect(content).toStrictEqual(expectedModFileContentWithoutApi);
        });
      });
    });

    it('should create template README.md file', () => {
      const { init } = require('../initialize');
      const { readFile } = require('../functions');

      setup();

      init(testPath);

      const content = readFile(`${testPath}/README.md`);

      expect(content).toStrictEqual(expectedReadmeContent);
    });

    it('should remove utils folder', () => {
      const { init } = require('../initialize');
      const { fileExists } = require('../functions');

      setup();

      const existsBefore = fileExists(`${testPath}/utils`);

      init(testPath);

      const existsAfter = fileExists(`${testPath}/utils`);

      expect(existsBefore).toStrictEqual(true);
      expect(existsAfter).toStrictEqual(false);
    });

    it('should remove init.json file', () => {
      const { init } = require('../initialize');
      const { fileExists } = require('../functions');

      setup();

      const existsBefore = fileExists(`${testPath}/config/init.json`);

      init(testPath);

      const existsAfter = fileExists(`${testPath}/config/init.json`);

      expect(existsBefore).toStrictEqual(true);
      expect(existsAfter).toStrictEqual(false);
    });

    it('should replace init.js with empty file', () => {
      const { init } = require('../initialize');
      const { readFile } = require('../functions');

      setup();

      const contentBefore = readFile(`${testPath}/init.js`);

      init(testPath);

      const contentAfter = readFile(`${testPath}/init.js`);

      expect(contentBefore).toStrictEqual('const test = () => \'test\'');
      expect(contentAfter).toStrictEqual('');
    });

    it('should remove CircleCI folder', () => {
      const { init } = require('../initialize');
      const { fileExists } = require('../functions');

      setup();

      const existsBefore = fileExists(`${testPath}/.circleci`);

      init(testPath);

      const existsAfter = fileExists(`${testPath}/.circleci`);

      expect(existsBefore).toStrictEqual(true);
      expect(existsAfter).toStrictEqual(false);
    });

    it('should remove demo.gif file', () => {
      const { init } = require('../initialize');
      const { fileExists } = require('../functions');

      setup();

      const existsBefore = fileExists(`${testPath}/demo.gif`);

      init(testPath);

      const existsAfter = fileExists(`${testPath}/demo.gif`);

      expect(existsBefore).toStrictEqual(true);
      expect(existsAfter).toStrictEqual(false);
    });

    describe('if pushToGithub was set to true', () => {
      it('should run without errors and push changes to GitHub at the end', () => {
        const { init } = require('../initialize');

        initJsonData.config.pushToGithub = true;

        setup();

        expect(() => {
          init(testPath);
        }).not.toThrow();
      });
    });

    describe('if compileTemplateMod was set to true', () => {
      it('should run without errors, create mod folder in OpenRCT2 plugin folder, and run npm build:develop script', () => {
        const { init } = require('../initialize');
        const { fileExists } = require('../functions');

        initJsonData.config.compileTemplateMod = true;

        setup();

        init(testPath);

        const exists = fileExists(`${testPath}/plugin/test`);

        expect(exists).toStrictEqual(true);
      });
    });
  });
});

afterEach(() => {
  const { removeFolder } = require('../functions');

  removeFolder(testPath);
});
