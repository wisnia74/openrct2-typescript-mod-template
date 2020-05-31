describe('functions', () => {
  describe('exec', () => {
    it('should be an instance of Function', () => {
      const { exec } = require('../functions');
      expect(exec).toBeInstanceOf(Function);
    });

    it('should run console commands', () => {
      const { exec } = require('../functions');
      expect(() => {
        exec('true');
      }).not.toThrow();
    });

    it('should return undefined', () => {
      const result = require('../functions').exec('true');
      expect(result).toStrictEqual(undefined);
    });
  });
});
