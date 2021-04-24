import * as Fetch from 'node-fetch';
import * as Utils from '../utils';

describe('utility functions', () => {
  const spiedFetch = jest.spyOn(Fetch, 'default');

  describe('fetchApiDeclarationFileData', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('fetches openrct2.d.ts API declaration file data from OpenRCT2 GitHub', async () => {
      expect.assertions(1);

      spiedFetch.mockImplementationOnce(() => Promise.resolve(new Fetch.Response('test')));

      await expect(Utils.fetchApiDeclarationFileData()).resolves.toStrictEqual('test');
    });
  });
});
