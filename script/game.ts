import './registerCustomPaths';
import { spawn } from 'child_process';
import config from '~/config';
import type { Logger } from '~/utils';

export default class GameRunner {
  private logger: Logger;

  static isRunning = false;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  run(): void {
    this.logger.info('Starting...');

    GameRunner.isRunning = true;

    const spawned = spawn(config.getString('OPENRCT2_MS_DOS_EXECUTABLE_PATH'));

    this.logger.success('OpenRCT2 is running!');

    const pipeStdout = (chunk: any): void => {
      if (chunk instanceof Buffer) {
        this.logger.log(chunk.toString().trim());
      }
    };

    this.logger.info('Piping OpenRCT2 stdout to console...');

    spawned.stdout.on('data', pipeStdout);
    spawned.stdout.on('error', pipeStdout);
    spawned.stderr.on('data', pipeStdout);

    this.logger.success('OpenRCT2 stdout is now piped to console!');
  }
}
