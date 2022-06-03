import path from 'path';
import type { RollupOptions } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import config from './config';
import { paths } from './utils';

export default <RollupOptions>{
  input: path.join(paths.src, 'index.ts'),
  output: {
    file: path.join(config.getString('OPENRCT2_PATH'), 'plugin', `${config.getString('MOD_NAME')}.js`),
    format: 'iife',
  },
  plugins: [
    json(),
    injectProcessEnv(config.getMap()),
    typescript(),
    terser({
      compress: false,
      mangle: false,
      keep_classnames: true,
      keep_fnames: true,
      format: {
        quote_style: 1,
        wrap_iife: true,
        preamble: '// Mod powered by https://github.com/wisnia74/openrct2-typescript-mod-template - MIT license',
      },
    }),
  ],
};
