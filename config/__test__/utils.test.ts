import mockedFileSystem from 'mock-fs';
import * as Utils from '../utils';

class ProcessArgv {
  private static realProcessArgv: string[] = process.argv;

  static mockReturnValue(arr: string[]) {
    process.argv = arr;
  }

  static restore() {
    process.argv = this.realProcessArgv;
  }
}

describe('utility functions', () => {
  describe('getProcessArguments', () => {
    beforeAll(() => {
      ProcessArgv.mockReturnValue(['Path\\To\\Node.exe', 'Path\\To\\Script.js', '--flag', 'value']);
    });

    afterAll(() => {
      ProcessArgv.restore();
    });

    it('returns object holding process arguments', () => {
      const result = Utils.getProcessArguments();

      expect(result).toStrictEqual({
        entrypoint: 'Path\\To\\Node.exe',
        flag: 'value',
      });
    });
  });

  describe('getResolvedPath', () => {
    beforeAll(() => {
      jest.spyOn(process, 'cwd').mockImplementation(() => 'FakeDisk:\\FakeProjectDir');
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('returns full relative path to specified directory', () => {
      const result = Utils.getResolvedPath('config');

      expect(result).toStrictEqual('FakeDisk:\\FakeProjectDir\\config');
    });
  });

  describe('getProjectPaths', () => {
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
      mockedFileSystem.restore();
      jest.restoreAllMocks();
    });

    it('returns paths to important directories in the project', () => {
      const result = Utils.getProjectPaths();

      expect(result).toStrictEqual({
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
