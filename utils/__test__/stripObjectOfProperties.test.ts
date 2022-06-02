import stripObjectOfProperties from '../stripObjectOfProperties';

describe('stripObjectOfProperties', () => {
  it('deletes properties on an object', () => {
    expect(stripObjectOfProperties({ a: 1, b: 2, c: 3 }, 'a', 'c')).toStrictEqual({ b: 2 });
  });
});
