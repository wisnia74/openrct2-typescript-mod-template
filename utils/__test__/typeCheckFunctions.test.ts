import { isString } from '../typeCheckFunctions';

describe('isString', () => {
  it('returns true if variable is string', () => {
    expect(isString('')).toBe(true);
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it.each([1, NaN, null, undefined, {}, (): void => {}])('return false if variable is %p', (val) => {
    expect(isString(val)).toBe(false);
  });
});
