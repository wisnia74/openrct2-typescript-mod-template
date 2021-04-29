import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  bail: 1,
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
};

export default config;
