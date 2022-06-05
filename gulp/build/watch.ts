import type { RollupOptions } from 'rollup';
import { watch as rollupWatch } from 'rollup';
import config from '~/config';
import { capitalizeFirstLetter } from '~/utils';
import build from './build';

export default (): Promise<never> =>
  new Promise(() => {
    import(`~/rollup.config.${config.getString('NODE_ENV')}`)
      .then(({ default: rollupConfig }: { default: RollupOptions }) => {
        const rollupWatcher = rollupWatch(rollupConfig);

        console.log(`Watching ${(rollupConfig.input && rollupConfig.input.toString()) || ''} for changes...`);

        rollupWatcher.on('change', (id, { event }) => {
          console.log(`${capitalizeFirstLetter(event)}d ${id}, rebuilding...`);

          build()
            .then(() => {
              console.log('Successfully rebuilt');
            })
            .catch((err) => {
              throw err;
            });
        });
      })
      .catch((err) => {
        throw err;
      });
  });
