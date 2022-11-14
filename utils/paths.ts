import path from 'path';
import rootDir from './rootDir';

export default {
  root: rootDir,
  github: path.join(rootDir, '.github'),
  config: path.join(rootDir, 'config'),
  dist: path.join(rootDir, 'dist'),
  lib: path.join(rootDir, 'lib'),
  src: path.join(rootDir, 'src'),
  utils: path.join(rootDir, 'utils'),
  script: path.join(rootDir, 'script'),
};
