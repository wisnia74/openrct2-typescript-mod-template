import { stringTypeCheckFunction } from '../typeCheckFunctions';

describe('stringTypeCheckFunction', () => {
  it('returns true if variable is string', () => {
    expect(stringTypeCheckFunction('')).toBe(true);
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it.each([1, NaN, null, undefined, {}, (): void => {}])('return false if variable is %p', (val) => {
    expect(stringTypeCheckFunction(val)).toBe(false);
  });
});
