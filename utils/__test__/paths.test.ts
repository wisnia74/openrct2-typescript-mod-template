import paths from '../paths';

jest.mock('../rootDir', () => 'FakeDisk:\\FakeProjectFolder');

describe('paths', () => {
  it('returns paths to folders inside a project', () => {
    expect(paths).toStrictEqual({
      root: 'FakeDisk:\\FakeProjectFolder',
      config: 'FakeDisk:\\FakeProjectFolder\\config',
      dist: 'FakeDisk:\\FakeProjectFolder\\dist',
      lib: 'FakeDisk:\\FakeProjectFolder\\lib',
      src: 'FakeDisk:\\FakeProjectFolder\\src',
      utils: 'FakeDisk:\\FakeProjectFolder\\utils',
    });
  });
});
