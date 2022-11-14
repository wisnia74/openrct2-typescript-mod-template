import './registerCustomPaths';
import { exec } from 'child_process';
import { Logger } from '~/utils';
import { ESLint } from 'eslint';

class LintRunner {
  private eslintInstance: ESLint;

  private logger: Logger;

  private isFixModeEnabled = !!process.argv.find((arg) => arg === '--fix');

  constructor(logger: Logger) {
    this.eslintInstance = new ESLint({ fix: this.isFixModeEnabled });
    this.logger = logger;
  }

  async run(): Promise<void> {
    this.logger.info('Starting...');
    this.logger.timeStart('lint');

    const results = await this.eslintInstance.lintFiles(['**/*.ts']);

    await ESLint.outputFixes(results);
    exec('git add .');

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
  await new LintRunner(new Logger({ name: 'eslint', output: console })).run();
})();
