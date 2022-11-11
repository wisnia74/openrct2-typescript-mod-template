import path from 'path';
import paths from '../paths';

jest.mock('../rootDir', () => path.join('FakeDisk:', 'FakeProjectFolder'));

describe('paths', () => {
  it('returns paths to folders inside a project', () => {
    expect(paths).toStrictEqual({
      root: path.join('FakeDisk:', 'FakeProjectFolder'),
      github: path.join('FakeDisk:', 'FakeProjectFolder', '.github'),
      config: path.join('FakeDisk:', 'FakeProjectFolder', 'config'),
      dist: path.join('FakeDisk:', 'FakeProjectFolder', 'dist'),
      gulp: path.join('FakeDisk:', 'FakeProjectFolder', 'gulp'),
      lib: path.join('FakeDisk:', 'FakeProjectFolder', 'lib'),
      src: path.join('FakeDisk:', 'FakeProjectFolder', 'src'),
      utils: path.join('FakeDisk:', 'FakeProjectFolder', 'utils'),
      script: path.join('FakeDisk:', 'FakeProjectFolder', 'script'),
    });
  });
});
