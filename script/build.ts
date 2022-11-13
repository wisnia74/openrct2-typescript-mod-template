import './registerCustomPaths';
import path from 'path';
import config from '~/config';
import { paths, Logger } from '~/utils';
import * as rollup from 'rollup';
import type { RollupOptions } from 'rollup';

class BuildRunner {
  private logger: Logger;

  private rollupConfig: RollupOptions;

  constructor({ logger, rollupConfig }: { logger: Logger; rollupConfig: RollupOptions }) {
    this.logger = logger;
    this.rollupConfig = rollupConfig;
  }

  async saveOutput(bundle: rollup.RollupBuild, outputOptions: rollup.OutputOptions): Promise<void> {
    const { output } = await bundle.write(outputOptions);

    for (let i = 0; i < output.length; i += 1) {
      const chunkOrAsset = output[i];

      if (chunkOrAsset.type === 'asset') {
        this.logger.success(`Wrote "${chunkOrAsset.fileName}" asset to a bundle`);
      } else {
        Object.keys(chunkOrAsset.modules).forEach((key) => {
          this.logger.success(`Wrote "${key}" chunk to a bundle`);
        });
      }
    }
  }

  async saveOutputs(bundle: rollup.RollupBuild): Promise<void> {
    if ((Array.isArray(this.rollupConfig.output) && !this.rollupConfig.output.length) || !this.rollupConfig.output) {
      this.logger.error('No output options found in the config file!');
      return;
    }

    if (Array.isArray(this.rollupConfig.output)) {
      for (let i = 0; i < this.rollupConfig.output.length; i += 1) {
        const outputBundleFilepath = this.rollupConfig.output[i].file;

        if (!outputBundleFilepath) {
          throw new Error('Missing output bundle filepath/-s!');
        }

        this.logger.info(`Generating "${outputBundleFilepath}" output bundle...`);

        // eslint-disable-next-line no-await-in-loop
        await this.saveOutput(bundle, this.rollupConfig.output[i]);
      }
    } else {
      if (!this.rollupConfig.output.file) {
        throw new Error('Missing output bundle filepath/-s!');
      }

      this.logger.info(`Generating "${this.rollupConfig.output.file}" output bundle...`);

      await this.saveOutput(bundle, this.rollupConfig.output);
    }
  }

  async runBuild(): Promise<void> {
    if (!this.rollupConfig.input) {
      throw new Error('Missing Rollup input filepath/-s!');
    }

    this.logger.info(`Bundling "${this.rollupConfig.input.toString()}" entry file...`);

    const bundle = await rollup.rollup(this.rollupConfig);

    await this.saveOutputs(bundle);
    await bundle.close();
  }

  async run(): Promise<void> {
    this.logger.info('Starting...');

    this.logger.timeStart('build');

    await this.runBuild();

    this.logger.success(`Finished in: ${this.logger.timeEnd('build')}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  const rollupConfig = (
    (await import(path.join(paths.root, `rollup.config.${config.getString('NODE_ENV')}.ts`))) as {
      default: RollupOptions;
    }
  ).default;

  await new BuildRunner({
    logger: new Logger({ name: 'Rollup', output: console }),
    rollupConfig,
  }).run();
})();
