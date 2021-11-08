export type ProjectPaths = {
  config: string;
  dist: string;
  lib: string;
  script: string;
  src: string;
  root: string;
};

export type ParsedProcessArguments = {
  [x: string]: unknown;
  entrypoint: string;
};

export type ProjectConfig = {
  paths: ProjectPaths;
  entrypoint: string;
  [x: string]: unknown;
};
