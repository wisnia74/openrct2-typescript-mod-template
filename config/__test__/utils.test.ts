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

describe('config utility functions', () => {
  describe('getProcessArguments', () => {
    it('returns object holding process arguments', () => {
      ProcessArgv.mockReturnValue(['Path\\To\\Node.exe', 'Path\\To\\Script.js', '--flag', 'value']);

      expect(Utils.getProcessArguments()).toStrictEqual({
        entrypoint: 'Path\\To\\Node.exe',
        flag: 'value',
      });

      ProcessArgv.restore();
    });
  });

  describe('getResolvedPath', () => {
    it('returns full relative path to specified directory', () => {
      const cwd = jest.spyOn(process, 'cwd').mockReturnValue('FakeDisk:\\FakeProjectDir');

      expect(Utils.getResolvedPath('config')).toStrictEqual('FakeDisk:\\FakeProjectDir\\config');

      cwd.mockRestore();
    });
  });

  describe('getProjectPaths', () => {
    it('returns paths to important directories in the project', () => {
      const cwd = jest.spyOn(process, 'cwd').mockReturnValue('FakeDisk:\\FakeProjectDir');

      expect(Utils.getProjectPaths()).toStrictEqual({
        config: 'FakeDisk:\\FakeProjectDir\\config',
        dist: 'FakeDisk:\\FakeProjectDir\\dist',
        lib: 'FakeDisk:\\FakeProjectDir\\lib',
        script: 'FakeDisk:\\FakeProjectDir\\script',
        src: 'FakeDisk:\\FakeProjectDir\\src',
        root: 'FakeDisk:\\FakeProjectDir',
      });

      cwd.mockRestore();
    });
  });
});
