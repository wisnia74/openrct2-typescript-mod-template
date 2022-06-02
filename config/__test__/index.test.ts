import config from '../index';

jest.mock(
  '../default.json',
  () => ({
    key1: 'value1',
    key2: 'value2',
  }),
  { virtual: true }
);

describe('config', () => {
  it('should return config object', () => {
    expect(config).toStrictEqual({
      key1: 'value1',
      key2: 'value2',
    });
  });
});
