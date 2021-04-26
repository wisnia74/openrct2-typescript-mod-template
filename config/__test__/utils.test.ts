import mockedFileSystem from 'mock-fs';
import * as Utils from '../utils';

describe('utility functions', () => {
  beforeAll(() => {
    mockedFileSystem({
      'FakeDisk:': {
        FakeProjectDir: {
          config: {},
          dist: {},
          lib: {},
          script: {},
          src: {},
        },
      },
    });

    jest.spyOn(process, 'cwd').mockImplementation(() => 'FakeDisk:\\FakeProjectDir');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('getProcessArguments', () => {
    it.todo('returns object holding process arguments');
  });

  describe('getResolvedPath', () => {
    it('returns full relative path to specified directory', () => {
      const result = Utils.getResolvedPath('config');

      expect(result).toStrictEqual('FakeDisk:\\FakeProjectDir\\config');
    });
  });

  describe('getProjectPaths', () => {
    it('returns paths to important directories in the project', () => {
      const result = Utils.getProjectPaths();

      expect(result).toMatchObject({
        config: 'FakeDisk:\\FakeProjectDir\\config',
        dist: 'FakeDisk:\\FakeProjectDir\\dist',
        lib: 'FakeDisk:\\FakeProjectDir\\lib',
        script: 'FakeDisk:\\FakeProjectDir\\script',
        src: 'FakeDisk:\\FakeProjectDir\\src',
        root: 'FakeDisk:\\FakeProjectDir',
      });
    });
  });
});
