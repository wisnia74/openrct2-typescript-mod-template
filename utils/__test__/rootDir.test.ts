import rootDir from '../rootDir';

jest.mock('process', () => ({
  cwd: (): string => 'FakeDisk://FakeFolder',
}));

describe('rootDir', () => {
  it('returns root directory of the project', () => {
    expect(rootDir).toBe('FakeDisk://FakeFolder');
  });
});
