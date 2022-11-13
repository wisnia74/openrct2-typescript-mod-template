import './registerCustomPaths';
import { Logger } from '~/utils';
import { ESLint } from 'eslint';

const isFixModeEnabled = !!process.argv.find((flag) => flag === '--fix');

class LintRunner {
  private eslintInstance: ESLint;

  private logger: Logger;

  constructor(logger: Logger) {
    this.eslintInstance = new ESLint({ fix: isFixModeEnabled });
    this.logger = logger;
  }

  async run(): Promise<void> {
    this.logger.info('Starting...');

    this.logger.timeStart('lint');

    const results = await this.eslintInstance.lintFiles(['**/*.ts']);

    if (isFixModeEnabled) {
      this.logger.info('Found "--fix" flag, attempting to fix lint errors...');
      await ESLint.outputFixes(results);
    }

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
  await new LintRunner(new Logger({ name: 'ESLint', output: console })).run();
})();
