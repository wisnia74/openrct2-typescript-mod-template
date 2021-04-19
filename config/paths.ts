import getResolvedPath from './utils';

const paths = {
  config: getResolvedPath('config'),
  dist: getResolvedPath('dist'),
  lib: getResolvedPath('lib'),
  script: getResolvedPath('script'),
  src: getResolvedPath('src'),
  root: getResolvedPath('.'),
};

export default paths;
