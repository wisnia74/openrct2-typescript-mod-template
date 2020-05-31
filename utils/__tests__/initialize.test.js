beforeEach(() => {
  const { createFolder } = require('../functions');
  createFolder(`${__dirname}/test`);
});

describe('init function', () => {
  describe('invoked when init.json doesn\'t exist', () => {
    it('should throw', () => {
      const { init } = require('../initialize');
      expect(() => {
        init(`${__dirname}/test`);
      }).toThrow();
    });
  });
});

afterEach(() => {
  const { removeFolder } = require('../functions');
  removeFolder(`${__dirname}/test`);
});
