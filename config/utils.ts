import path from 'path';
import { ProjectPaths } from './types';

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
