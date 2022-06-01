import path from 'path';
import rootDir from './rootDir';

export default {
  root: rootDir,
  dist: path.join(rootDir, 'dist'),
  config: path.join(rootDir, 'config'),
  lib: path.join(rootDir, 'lib'),
  src: path.join(rootDir, 'src'),
  utils: path.join(rootDir, 'utils'),
};
