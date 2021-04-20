import mockedFileSystem from 'mock-fs';
import getResolvedPath from '../utils';

describe('getResolvedPath function', () => {
  beforeAll(() => {
    mockedFileSystem({
      'FakeDisk:': {
        fakeProjectDir: {
          fakeExistingDir: {
            fakeExistingSubDir: {},
          },
        },
      },
    });

    process.cwd = jest.fn().mockReturnValue('FakeDisk:\\fakeProjectDir');
  });

  it('returns full relative path to specified directory if it exists', () => {
    const actualResult = getResolvedPath('fakeExistingDir/fakeExistingSubDir');
    const expectedResult = 'FakeDisk:\\fakeProjectDir\\fakeExistingDir\\fakeExistingSubDir';

    expect(actualResult).toStrictEqual(expectedResult);
  });

  it('throws an error if path that it tries to resolve doesn\'t exist', () => {
    const wrappedFunc = () => getResolvedPath('fakeNotExistingDir');
    const expectedError = new Error('FakeDisk:\\fakeProjectDir\\fakeNotExistingDir does not exist.');

    expect(wrappedFunc).toThrow(expectedError);
  });

  afterAll(() => {
    mockedFileSystem.restore();
    jest.clearAllMocks();
  });
});
