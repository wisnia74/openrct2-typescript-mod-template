import './registerCustomPaths';
import path from 'path';
import GameRunner from './game';
import config from '~/config';
import { paths, Logger } from '~/utils';
import * as rollup from 'rollup';
import type { RollupOptions } from 'rollup';

class WatchRunner {
  private logger: Logger;

  private rollupConfig: RollupOptions;

  static hasInitialBuildBeenRun = false;

  constructor({ logger, rollupConfig }: { logger: Logger; rollupConfig: RollupOptions }) {
    this.logger = logger;
    this.rollupConfig = rollupConfig;
  }

  run(): void {
    const watcher = rollup.watch(this.rollupConfig);

    watcher.on('event', (event) => {
      switch (event.code) {
        case 'START':
          this.logger.timeStart('bundle');

          if (!WatchRunner.hasInitialBuildBeenRun) {
            this.logger.info('Starting...');
            WatchRunner.hasInitialBuildBeenRun = true;
          } else {
            this.logger.info('Detected file changes, rebundling...');
          }

          break;
        case 'BUNDLE_START':
          if (event.input) {
            this.logger.info(`Bundling "${event.input.toString()}" entry file...`);
          }

          break;
        case 'BUNDLE_END':
          event.result.close().catch((err) => {
            throw err;
          });

          break;
        case 'END':
          this.logger.success(`Bundling finished in: ${this.logger.timeEnd('bundle')}`);

          if (!config.has('OPENRCT2_MS_DOS_EXECUTABLE_PATH') || GameRunner.isRunning) {
            break;
          }

          this.logger.info('Launching OpenRCT2 instance...');
          new GameRunner(new Logger({ name: 'openrct2', output: console })).run();

          break;
        case 'ERROR':
          this.logger.error(event.error.code, event.error.message, event.error.stack);
          break;
        default:
          break;
      }
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  const rollupConfig = (
    (await import(path.join(paths.root, `rollup.config.${config.getString('NODE_ENV')}.ts`))) as {
      default: RollupOptions;
    }
  ).default;

  new WatchRunner({
    logger: new Logger({ name: 'rollup-watch', output: console }),
    rollupConfig,
  }).run();
})();
