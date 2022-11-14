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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pipeStdoutToConsole = (chunk: any): void => {
      if (chunk instanceof Buffer) {
        const formattedChunk = chunk
          .toString()
          // eslint-disable-next-line no-control-regex
          .replace(/(\n|\r\n)(\x1B\[0m)(\n|\r\n)$/, '$1')
          .replace(/(?<=\r\n|\n)(.)/g, `${this.logger.prepend} $1`)
          .trim();

        this.logger.log(formattedChunk);
      }
    };

    this.logger.info('Piping OpenRCT2 stdout to console...');

    spawned.stdout.on('data', pipeStdoutToConsole);
    spawned.stdout.on('error', pipeStdoutToConsole);
    spawned.stderr.on('data', pipeStdoutToConsole);

    this.logger.success('OpenRCT2 stdout is now piped to console!');
  }
}
