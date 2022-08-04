import * as jest from 'jest';

export default async function testWatch(): Promise<void> {
  return jest.run(['--watch']);
}
