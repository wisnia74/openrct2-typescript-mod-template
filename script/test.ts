import './registerCustomPaths';
import { Logger } from '~/utils';
import * as jest from 'jest';

class TestRunner {
  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async run(): Promise<void> {
    this.logger.info('Starting...');
    this.logger.timeStart('test');

    await jest.run(process.argv.slice(2));

    this.logger.success(`Finished in: ${this.logger.timeEnd('test')}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  await new TestRunner(new Logger({ name: 'jest', output: console })).run();
})();
