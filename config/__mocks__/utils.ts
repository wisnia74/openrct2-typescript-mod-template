import type { ProjectPaths, ParsedProcessArguments } from '../types';

export const getProjectPaths = (): ProjectPaths => ({
  config: 'FakeDisk:\\FakeProjectDir\\config',
  dist: 'FakeDisk:\\FakeProjectDir\\dist',
  lib: 'FakeDisk:\\FakeProjectDir\\lib',
  script: 'FakeDisk:\\FakeProjectDir\\script',
  src: 'FakeDisk:\\FakeProjectDir\\src',
  root: 'FakeDisk:\\FakeProjectDir\\root',
});

export const getProcessArguments = (): ParsedProcessArguments => ({
  entrypoint: 'Path\\To\\Node.exe',
  flag1: 'value1',
  flag2: 'value2',
});
