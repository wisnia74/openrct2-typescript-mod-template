import { getProcessArguments, getProjectPaths } from './utils';

export default {
  paths: getProjectPaths(),
  ...getProcessArguments(),
};
