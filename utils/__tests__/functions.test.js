describe('functions', () => {
  describe('exec', () => {
    const opts = { stdio: undefined };

    it('should be an instance of Function', () => {
      const { exec } = require('../functions');
      expect(exec).toBeInstanceOf(Function);
    });

    it('should run console commands', () => {
      const { exec } = require('../functions');
      expect(() => {
        exec('echo', opts);
      }).not.toThrow();
    });

    it('should return undefined', () => {
      const result = require('../functions').exec('echo', opts);
      expect(result).toStrictEqual(undefined);
    });

    it('should throw an error if command is invalid', () => {
      const { exec } = require('../functions');
      expect(() => {
        exec('invalid-command', opts);
      }).toThrow();
    });
  });
});
