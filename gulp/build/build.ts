import type { OutputOptions, RollupOptions, RollupOutput } from 'rollup';
import { rollup } from 'rollup';
import config from '~/config';

export default async (): Promise<RollupOutput[]> => {
  const { default: rollupConfig } = (await import(`~/rollup.config.${config.getString('NODE_ENV')}`)) as {
    default: RollupOptions;
  };
  const { input, plugins } = rollupConfig;
  const outputs = rollupConfig.output as OutputOptions[];
  const bundle = await rollup({ input, plugins });

  return Promise.all(outputs.map((output) => bundle.write(output)));
};
