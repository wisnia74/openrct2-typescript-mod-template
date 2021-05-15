import fs from 'fs';
import * as Fetch from 'node-fetch';
import * as Utils from '../utils';

jest.mock('config', () => ({
  paths: {
    config: 'FakeDisk:\\FakeProjectDir\\config',
    dist: 'FakeDisk:\\FakeProjectDir\\dist',
    lib: 'FakeDisk:\\FakeProjectDir\\lib',
    script: 'FakeDisk:\\FakeProjectDir\\script',
    src: 'FakeDisk:\\FakeProjectDir\\src',
    root: 'FakeDisk:\\FakeProjectDir\\root',
  },
}));

describe('fetchApiDeclarationFileData', () => {
  it('fetches openrct2.d.ts API declaration file data from OpenRCT2 GitHub', async () => {
    expect.assertions(1);

    jest.spyOn(Fetch, 'default').mockResolvedValueOnce(new Fetch.Response('data'));

    await expect(Utils.fetchApiDeclarationFileData()).resolves.toStrictEqual('data');

    jest.restoreAllMocks();
  });

  it('handles error if one was thrown', async () => {
    expect.assertions(1);

    jest.spyOn(Fetch, 'default').mockRejectedValueOnce(new Error('timeout'));

    await expect(Utils.fetchApiDeclarationFileData()).rejects.toThrow(new Error('Could not fetch openrct2.d.ts API declaration file from OpenRCT2 GitHub'));

    jest.restoreAllMocks();
  });
});

describe('createApiDeclarationFile', () => {
  it('calls fetchApiDeclarationFileData once', async () => {
    expect.assertions(1);

    jest.spyOn(Utils, 'fetchApiDeclarationFileData').mockImplementationOnce(jest.fn().mockResolvedValue('data'));
    jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(() => jest.fn());

    await Utils.createApiDeclarationFile();

    expect(Utils.fetchApiDeclarationFileData).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
  });

  it('calls fs.writeFileSync once with correct path and data', async () => {
    expect.assertions(1);

    jest.spyOn(Utils, 'fetchApiDeclarationFileData').mockImplementationOnce(jest.fn().mockResolvedValue('data'));
    jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(() => jest.fn());

    await Utils.createApiDeclarationFile();

    expect(fs.writeFileSync).toHaveBeenNthCalledWith(1, 'FakeDisk:\\FakeProjectDir\\lib\\openrct2.d.ts', 'data');

    jest.restoreAllMocks();
  });
});
