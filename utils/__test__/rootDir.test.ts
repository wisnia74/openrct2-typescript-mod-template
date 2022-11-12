import rootDir from '../rootDir';
import path from 'path';

jest.mock('process', () => ({
  cwd: (): string => path.join('FakeDisk:', 'FakeFolder'),
}));

describe('rootDir', () => {
  it('returns root directory of the project', () => {
    expect(rootDir).toBe(path.join('FakeDisk:', 'FakeFolder'));
  });
});
