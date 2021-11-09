import path from 'path';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import config from './config';

export default {
  input: path.join(config.paths.src, 'registerPlugin.ts'),
  output: {
    file: path.join(config.paths.dist, 'MOD_NAME.js'),
    format: 'iife',
  },
  plugins: [
    typescript({
      module: 'ES2020',
    }),
    terser({
      format: {
        quote_style: 1,
        wrap_iife: true,
        preamble: '// Mod powered by https://github.com/wisnia74/openrct2-typescript-mod-template - MIT license',
      },
    }),
  ],
};
