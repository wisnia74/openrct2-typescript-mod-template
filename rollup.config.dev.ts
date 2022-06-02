import path from 'path';
import type { RollupOptions } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import config from './config';
import { paths, readJSON } from './utils';

const localConfig = readJSON(path.join(paths.config, 'local.json'));

if (!localConfig.OPENRCT2_PATH) throw new Error('Missing OPENRCT2_PATH in ./config/local.json');
if (typeof localConfig.OPENRCT2_PATH !== 'string') throw new Error('OPENRCT2_PATH has to be a string');

export default <RollupOptions>{
  input: path.join(paths.src, 'index.ts'),
  output: {
    file: path.join(localConfig.OPENRCT2_PATH, 'plugin', `${config.MOD_NAME}.js`),
    format: 'iife',
  },
  plugins: [
    json(),
    typescript(),
    terser({
      format: {
        quote_style: 1,
        wrap_iife: true,
        preamble: '// Mod powered by https://github.com/wisnia74/openrct2-typescript-mod-template - MIT license',
      },
    }),
  ],
};
