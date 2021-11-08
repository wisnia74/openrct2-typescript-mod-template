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

describe('getProcessArguments', () => {
  it('returns object holding process arguments', () => {
    ProcessArgv.mockReturnValue([
      'Path\\To\\Node.exe',
      'Path\\To\\Script.js',
      '--flag1',
      'value1',
      '--flag2',
      'value2',
    ]);

    expect(Utils.getProcessArguments()).toStrictEqual({
      entrypoint: 'Path\\To\\Node.exe',
      flag1: 'value1',
      flag2: 'value2',
    });

    ProcessArgv.restore();
  });
});

describe('getResolvedPath', () => {
  it('returns full relative path to specified directory', () => {
    jest.spyOn(process, 'cwd').mockReturnValue('FakeDisk:\\FakeProjectDir');

    const path = Utils.getResolvedPath('config');
    expect(path).toBe('FakeDisk:\\FakeProjectDir\\config');

    jest.restoreAllMocks();
  });
});

describe('getProjectPaths', () => {
  it('returns paths to important directories in the project', () => {
    jest.spyOn(process, 'cwd').mockReturnValue('FakeDisk:\\FakeProjectDir');

    const paths = Utils.getProjectPaths();
    expect(paths).toStrictEqual({
      config: 'FakeDisk:\\FakeProjectDir\\config',
      dist: 'FakeDisk:\\FakeProjectDir\\dist',
      lib: 'FakeDisk:\\FakeProjectDir\\lib',
      script: 'FakeDisk:\\FakeProjectDir\\script',
      src: 'FakeDisk:\\FakeProjectDir\\src',
      root: 'FakeDisk:\\FakeProjectDir',
    });

    jest.restoreAllMocks();
  });
});
