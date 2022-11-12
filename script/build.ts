import './registerCustomPaths';
import { spawn } from 'child_process';
import config from '~/config';

((): void => {
  const spawned = spawn(
    'rollup',
    [
      '--config',
      `rollup.config.${config.getString('NODE_ENV')}.ts`,
      process.argv.slice(2).join(' '),
      '--configPlugin',
      'typescript',
    ],
    { shell: true }
  );

  spawned.stderr.pipe(process.stderr);
  spawned.stdout.pipe(process.stdout);
})();
