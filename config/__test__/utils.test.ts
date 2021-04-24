import * as Utils from '../utils';

describe('utility functions', () => {
  beforeAll(() => {
    jest.spyOn(process, 'cwd').mockImplementation(() => 'FakeDisk:\\fakeProjectDir');
  });

  describe('getResolvedPath', () => {
    it('returns full relative path to specified directory', () => {
      const result = Utils.getResolvedPath('config');

      expect(result).toStrictEqual('FakeDisk:\\fakeProjectDir\\config');
    });
  });

  describe('getProjectPaths', () => {
    it('returns paths to important directories in the project', () => {
      const result = Utils.getProjectPaths();

      expect(result).toMatchObject({
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
    jest.restoreAllMocks();
  });
});
