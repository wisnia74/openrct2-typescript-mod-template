import capitalizeFirstLetter from '../capitalizeFirstLetter';

describe('capitalizeFirstLetter', () => {
  it('capitalizesFirstLetter', () => {
    expect(capitalizeFirstLetter('test')).toBe('Test');
  });
});
