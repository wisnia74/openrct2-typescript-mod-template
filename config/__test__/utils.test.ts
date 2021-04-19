import mockedFileSystem from 'mock-fs';
import path from 'path';
import getResolvedPath from '../utils';

describe('getResolvedPath', () => {
  beforeAll(() => {
    mockedFileSystem({
      fakeExistingDir: {
        fakeExistingSubDir: {},
      },
    });
  });

  it('returns full relative path to specified directory if it exists', () => {
    const actualResult = getResolvedPath('fakeExistingDir/fakeExistingSubDir');
    const expectedResult = path.resolve(process.cwd(), 'fakeExistingDir', 'fakeExistingSubDir');

    expect(actualResult).toStrictEqual(expectedResult);
  });

  it('throws an error if path that it tries to resolve doesn\'t exist', () => {
    const wrappedFunc = () => getResolvedPath('fakeNotExistingDir');
    const expectedError = new Error(`${process.cwd()}\\fakeNotExistingDir doesn't exist.`);

    expect(wrappedFunc).toThrow(expectedError);
  });

  afterAll(() => {
    mockedFileSystem.restore();
  });
});
