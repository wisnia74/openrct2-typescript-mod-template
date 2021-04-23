import mockedFileSystem from 'mock-fs';
import * as Utils from '../utils';

describe('utility functions', () => {
  beforeAll(() => {
    mockedFileSystem({
      'FakeDisk:': {
        fakeProjectDir: mockedFileSystem.load(`${process.cwd()}`),
      },
    });

    process.cwd = jest.fn(() => 'FakeDisk:\\fakeProjectDir');
  });

  describe('getResolvedPath', () => {
    it('returns full relative path to specified directory', () => {
      expect(Utils.getResolvedPath('config')).toStrictEqual('FakeDisk:\\fakeProjectDir\\config');
    });
  });

  describe('getProjectPaths', () => {
    it('returns paths to important directories in the project', () => {
      expect(Utils.getProjectPaths()).toMatchObject({
        config: 'FakeDisk:\\fakeProjectDir\\config',
        dist: 'FakeDisk:\\fakeProjectDir\\dist',
        lib: 'FakeDisk:\\fakeProjectDir\\lib',
        script: 'FakeDisk:\\fakeProjectDir\\script',
        src: 'FakeDisk:\\fakeProjectDir\\src',
        root: 'FakeDisk:\\fakeProjectDir',
      });
    });
  });

  afterAll(() => {
    mockedFileSystem.restore();
    jest.clearAllMocks();
  });
});
