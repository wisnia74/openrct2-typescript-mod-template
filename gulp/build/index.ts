import { series } from 'gulp';
import watch from './watch';
import build from './build';

export { default as build } from './build';
export { default as watch } from './watch';

export const buildWatch = series(build, watch);
