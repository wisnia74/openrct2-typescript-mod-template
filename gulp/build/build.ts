import type { ChildProcess } from 'child_process';
import { spawn } from 'child_process';
import config from '~/config';

export default function build(): ChildProcess {
  const spawned = spawn(
    'rollup',
    ['--config', `rollup.config.${config.getString('NODE_ENV')}.ts`, '--configPlugin', 'typescript'],
    { shell: true }
  );

  spawned.stderr.pipe(process.stderr);
  spawned.stdout.pipe(process.stdout);

  return spawned;
}
