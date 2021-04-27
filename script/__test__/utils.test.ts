import * as Fetch from 'node-fetch';
import * as Utils from '../utils';

describe('utility functions', () => {
  describe('fetchApiDeclarationFileData', () => {
    beforeAll(() => {
      jest.spyOn(Fetch, 'default')
        .mockImplementationOnce(() => Promise.resolve(new Fetch.Response('test')))
        .mockImplementationOnce(() => Promise.reject(new Error('timeout')));
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('fetches openrct2.d.ts API declaration file data from OpenRCT2 GitHub if there was no error', async () => {
      expect.assertions(1);

      const promise = Utils.fetchApiDeclarationFileData();

      await expect(promise).resolves.toStrictEqual('test');
    });

    it('handles error if one was thrown', async () => {
      expect.assertions(1);

      const promise = Utils.fetchApiDeclarationFileData();
      const expectedError = new Error('Could not fetch openrct2.d.ts API declaration file from OpenRCT2 GitHub');

      await expect(promise).rejects.toThrow(expectedError);
    });
  });
});
