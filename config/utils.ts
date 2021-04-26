import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ProjectPaths, ParsedProcessArguments } from './types';

export const getProcessArguments = (): ParsedProcessArguments => {
  const { argv } = yargs(hideBin(process.argv));

  const parsedArgs = Object.keys(argv).reduce((acc, key) => {
    if (key === '$0') acc.entrypoint = argv[key];
    else if (key !== '_') acc[key] = argv[key];

    return acc;
  }, <ParsedProcessArguments>{});

  return parsedArgs;
};

export const getResolvedPath = (relativePath: string): string => {
  const currentDir = process.cwd();
  const pathResolvedRelatively = path.join(currentDir, relativePath);

  return pathResolvedRelatively;
};

export const getProjectPaths = (): ProjectPaths => ({
  config: getResolvedPath('config'),
  dist: getResolvedPath('dist'),
  lib: getResolvedPath('lib'),
  script: getResolvedPath('script'),
  src: getResolvedPath('src'),
  root: getResolvedPath('.'),
});
