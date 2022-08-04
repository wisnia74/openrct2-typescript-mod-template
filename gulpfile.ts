import * as tsConfigPaths from 'tsconfig-paths';

// register tsconfig-paths before exporting Gulp tasks, so that ts-node recognizes "paths" mapping from tsconfig.json
tsConfigPaths.register();

export * from './gulp';
