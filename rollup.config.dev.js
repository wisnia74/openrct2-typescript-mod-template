import path from 'path';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import paths from './config';

export default {
  input: path.resolve(paths.src, 'registerPlugin.ts'),
  output: {
    file: path.resolve('PATH_TO_OPENRCT2', 'plugin', 'MOD_NAME.js'),
    format: 'iife',
  },
  plugins: [
    typescript({
      module: 'ESNext',
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
