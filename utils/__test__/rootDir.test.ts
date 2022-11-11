import path from 'path';
import rootDir from '../rootDir';

jest.mock('process', () => ({
  cwd: (): string => path.join('FakeDisk:', 'FakeFolder'),
}));

describe('rootDir', () => {
  it('returns root directory of the project', () => {
    expect(rootDir).toBe(path.join('FakeDisk:', 'FakeFolder'));
  });
});
