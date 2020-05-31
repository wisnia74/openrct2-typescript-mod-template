beforeEach(() => {
  const { createFolder } = require('../functions');
  createFolder(`${__dirname}/test`);
});

describe('initialize function', () => {
  describe('when init.json doesn\'t exist', () => {
    it('should throw an error', () => {
      const { init } = require('../initialize');
      expect(() => {
        init(`__dirname/test`);
      }).toThrow();
    });
  });
});

afterEach(() => {
  const { removeFolder } = require('../functions');
  removeFolder(`${__dirname}/test`);
});
