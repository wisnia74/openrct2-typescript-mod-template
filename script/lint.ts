import './registerCustomPaths';
import { exec } from 'child_process';
import { ESLint } from 'eslint';
import { Logger } from '~/utils';

const isFixModeEnabled = !!process.argv.find((flag) => flag === '--fix');
let hasAutoFixBeenRun = false;

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

    if (results.some((result) => result.errorCount > 0) && isFixModeEnabled && !hasAutoFixBeenRun) {
      this.logger.error('Found lint errros, attempting to auto-fix...');

      await ESLint.outputFixes(results);

      this.logger.success('Successfully fixed auto-fixable lint errros, re-running lint...');

      hasAutoFixBeenRun = true;
      exec('git add .');
      await this.run();
      return;
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
