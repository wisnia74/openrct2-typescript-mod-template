import { getProcessArguments, getProjectPaths } from './utils';
import type { ProjectConfig } from './types';

const config: ProjectConfig = {
  paths: getProjectPaths(),
  ...getProcessArguments(),
};

export default config;
