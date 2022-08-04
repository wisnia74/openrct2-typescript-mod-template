import * as jest from 'jest';

export default async function testCoverage(): Promise<void> {
  return jest.run(['--coverage']);
}
