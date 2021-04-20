import getResolvedPath from './utils';

const getProjectPaths = () => {
  const paths = {
    config: getResolvedPath('config'),
    dist: getResolvedPath('dist'),
    lib: getResolvedPath('lib'),
    script: getResolvedPath('script'),
    src: getResolvedPath('src'),
    root: getResolvedPath('.'),
  };

  return paths;
};

export default getProjectPaths;
