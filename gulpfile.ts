import { register } from 'tsconfig-paths';

// register tsconfig-paths before exporting Gulp tasks, so that ts-node recognizes "paths" mapping from tsconfig.json
register();

export * from './gulp';
