import path from 'path';
import rootDir from './rootDir';

export default {
  root: rootDir,
  config: path.join(rootDir, 'config'),
  dist: path.join(rootDir, 'dist'),
  lib: path.join(rootDir, 'lib'),
  src: path.join(rootDir, 'src'),
  utils: path.join(rootDir, 'utils'),
};
