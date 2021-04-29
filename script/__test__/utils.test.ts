import mockFs from 'mock-fs';
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
    root: 'FakeDisk:\\FakeProjectDir',
  },
  entrypoint: 'Path\\To\\Node.exe',
  flag: 'value',
}));

describe('script utility functions', () => {
  describe('fetchApiDeclarationFileData', () => {
    it('fetches openrct2.d.ts API declaration file data from OpenRCT2 GitHub as string', async () => {
      expect.assertions(1);

      jest.spyOn(Fetch, 'default').mockResolvedValueOnce(new Fetch.Response('test'));

      await expect(Utils.fetchApiDeclarationFileData()).resolves.toStrictEqual('test');
    });

    it('handles error if one was thrown', async () => {
      expect.assertions(1);

      jest.spyOn(Fetch, 'default').mockRejectedValueOnce(new Error('timeout'));

      await expect(Utils.fetchApiDeclarationFileData()).rejects.toThrow(new Error('Could not fetch openrct2.d.ts API declaration file from OpenRCT2 GitHub'));
    });
  });

  describe('createReadmeInLib', () => {
    it('creates a README.md in lib directory', () => {
      mockFs({
        'FakeDisk:': {
          FakeProjectDir: {
            lib: {},
          },
        },
      });

      Utils.createReadmeFileInLib('test');

      expect(fs.readFileSync('FakeDisk:\\FakeProjectDir\\lib\\README.md').toString()).toStrictEqual('test');

      mockFs.restore();
    });
  });
});
