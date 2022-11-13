import './registerCustomPaths';
import { Logger } from '~/utils';
import { ESLint } from 'eslint';

class Linter {
  private eslintInstance: ESLint;

  private logger: Logger;

  constructor(logger: Logger) {
    this.eslintInstance = new ESLint();
    this.logger = logger;
  }

  async run(): Promise<void> {
    this.logger.timeStart('lint');

    const results = await this.eslintInstance.lintFiles(['**/*.ts']);
    const formatter = await this.eslintInstance.loadFormatter('stylish');
    const formattedResults = formatter.format(results);

    if (formattedResults) {
      this.logger.log(formattedResults);
    }

    if (results.some((result) => result.errorCount > 0)) {
      throw new Error('Lint failed!');
    }

    this.logger.success(`Finished in: ${this.logger.timeEnd('lint')}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  await new Linter(new Logger({ name: 'ESLint', output: console })).run();
})();
