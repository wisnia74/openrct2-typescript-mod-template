import fs from 'fs';
import * as Fetch from 'node-fetch';
import * as Utils from '../utils';

jest.mock('config', () => ({
  entrypoint: 'Path\\To\\Node.exe',
  paths: {
    config: 'FakeDisk:\\FakeProjectDir\\config',
    dist: 'FakeDisk:\\FakeProjectDir\\dist',
    lib: 'FakeDisk:\\FakeProjectDir\\lib',
    script: 'FakeDisk:\\FakeProjectDir\\script',
    src: 'FakeDisk:\\FakeProjectDir\\src',
    root: 'FakeDisk:\\FakeProjectDir\\.',
  },
}));

describe('fetchApiDeclarationFileData', () => {
  it('fetches openrct2.d.ts API declaration file data from OpenRCT2 GitHub', async () => {
    expect.assertions(1);

    jest.spyOn(Fetch, 'default').mockResolvedValue(new Fetch.Response('data'));

    await expect(Utils.fetchApiDeclarationFileData()).resolves.toBe('data');

    jest.restoreAllMocks();
  });

  it('handles error if one was thrown', async () => {
    expect.assertions(1);

    jest.spyOn(Fetch, 'default').mockRejectedValue(new Error('timeout'));

    await expect(Utils.fetchApiDeclarationFileData()).rejects.toThrow(
      new Error('Could not fetch openrct2.d.ts API declaration file from OpenRCT2 GitHub')
    );

    jest.restoreAllMocks();
  });
});

describe('createApiDeclarationFile', () => {
  it('calls fetchApiDeclarationFileData once to fetch openrct2.d.ts', async () => {
    expect.assertions(1);

    jest.spyOn(Utils, 'fetchApiDeclarationFileData').mockResolvedValue('data');
    jest.spyOn(fs, 'mkdirSync').mockImplementation();
    jest.spyOn(fs, 'writeFileSync').mockImplementation();

    await Utils.createApiDeclarationFile();

    expect(Utils.fetchApiDeclarationFileData).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
  });

  it('calls fs.mkdirSync to create a lib directory', async () => {
    expect.assertions(2);

    jest.spyOn(Utils, 'fetchApiDeclarationFileData').mockResolvedValue('data');
    jest.spyOn(fs, 'mkdirSync').mockImplementation();
    jest.spyOn(fs, 'writeFileSync').mockImplementation();

    await Utils.createApiDeclarationFile();

    expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
    expect(fs.mkdirSync).toHaveBeenCalledWith('FakeDisk:\\FakeProjectDir\\lib');

    jest.restoreAllMocks();
  });

  it('calls fs.writeFileSync to save a file with fetched openrct2.d.ts', async () => {
    expect.assertions(2);

    jest.spyOn(Utils, 'fetchApiDeclarationFileData').mockResolvedValue('data');
    jest.spyOn(fs, 'mkdirSync').mockImplementation();
    jest.spyOn(fs, 'writeFileSync').mockImplementation();

    await Utils.createApiDeclarationFile();

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledWith('FakeDisk:\\FakeProjectDir\\lib\\openrct2.d.ts', 'data');

    jest.restoreAllMocks();
  });
});

describe('replaceTextInFile', () => {
  it('calls fs.readFileSync correct amount of times, each time with correct filepath', () => {
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => Buffer.from('data'));
    jest.spyOn(fs, 'writeFileSync').mockImplementation();

    Utils.replaceTextInFile('FakeDisk:\\FakeProjectDir\\file.txt', [
      { searchValue: /searchValue1/, replaceValue: 'replaceValue1' },
      { searchValue: /searchValue2/, replaceValue: 'replaceValue2' },
    ]);

    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith('FakeDisk:\\FakeProjectDir\\file.txt');

    jest.restoreAllMocks();
  });

  it('calls fs.writeFileSync correct amount of times, each time with correct filepath and file data', () => {
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => Buffer.from('searchValue1\nsearchValue2'));
    jest.spyOn(fs, 'writeFileSync').mockImplementation();

    Utils.replaceTextInFile('FakeDisk:\\FakeProjectDir\\file.txt', [
      { searchValue: /searchValue1/, replaceValue: 'replaceValue1' },
      { searchValue: /searchValue2/, replaceValue: 'replaceValue2' },
    ]);

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      'FakeDisk:\\FakeProjectDir\\file.txt',
      'replaceValue1\nreplaceValue2'
    );

    jest.restoreAllMocks();
  });
});
