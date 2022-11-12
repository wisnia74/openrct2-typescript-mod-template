import * as jest from 'jest';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  await jest.run(process.argv.slice(2));
})();
