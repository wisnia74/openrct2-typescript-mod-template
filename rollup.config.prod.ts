import path from 'path';
import type { RollupOptions } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import config from './config';
import { paths } from './utils';

export default <RollupOptions>{
  input: path.join(paths.src, 'index.ts'),
  output: {
    file: path.join(paths.dist, `${config.MOD_NAME}.js`),
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
