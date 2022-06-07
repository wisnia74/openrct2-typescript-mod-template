import Env from '../Env';

describe('class Env', () => {
  const config = new Env({ key1: 'value1', key2: 'value2' });

  describe('has', () => {
    it('returns true if key was found in config object', () => {
      expect(config.has('key1')).toBe(true);
    });
  });

  describe('getConfigObject', () => {
    it('returns config object', () => {
      expect(config.getEnvConfigObject()).toStrictEqual({ key1: 'value1', key2: 'value2' });
    });
  });

  describe('getString', () => {
    it('returns string if key was found in config object', () => {
      expect(config.getString('key1')).toBe('value1');
    });

    it('throws error otherwise', () => {
      expect(() => config.getString('key3')).toThrow('key3 has invalid type - expected string but got undefined');
    });
  });
});
