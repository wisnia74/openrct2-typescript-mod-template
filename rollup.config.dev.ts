import path from 'path';
import type { RollupOptions } from 'rollup';
import typescript from 'rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';
import dotenv from 'rollup-plugin-dotenv';
import nodeResolve from '@rollup/plugin-node-resolve';
import { cjsToEsm } from 'cjstoesm';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import config from './config';
import paths from './utils';

export default <RollupOptions>{
  input: path.join(paths.src, 'index.ts'),
  output: {
    file: path.join(config.OPENRCT2_PATH, 'plugin', config.MOD_NAME, '.js'),
    format: 'iife',
  },
  plugins: [
    nodePolyfills(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    dotenv(),
    nodeResolve(),
    typescript({
      transformers: [cjsToEsm()],
      tsconfig: {
        allowSyntheticDefaultImports: true,
        allowJs: true,
      },
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
