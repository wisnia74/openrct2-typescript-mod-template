import mockedFileSystem from 'mock-fs';
import getProjectPaths from '../paths';

describe('getProjectPaths function', () => {
  beforeAll(() => {
    mockedFileSystem({
      'FakeDisk:': {
        fakeProjectDir: {
          config: {},
          dist: {},
          lib: {},
          script: {},
          src: {},
          root: {},
        },
      },
    });

    process.cwd = jest.fn().mockReturnValue('FakeDisk:\\fakeProjectDir');
  });

  it('returns paths to important directories in the project', () => {
    const actualResult = getProjectPaths();
    const expectedResult = {
      config: 'FakeDisk:\\fakeProjectDir\\config',
      dist: 'FakeDisk:\\fakeProjectDir\\dist',
      lib: 'FakeDisk:\\fakeProjectDir\\lib',
      script: 'FakeDisk:\\fakeProjectDir\\script',
      src: 'FakeDisk:\\fakeProjectDir\\src',
      root: 'FakeDisk:\\fakeProjectDir',
    };

    expect(actualResult).toStrictEqual(expectedResult);
  });

  afterAll(() => {
    mockedFileSystem.restore();
    jest.clearAllMocks();
  });
});
