import { ESLint } from 'eslint';

export default async (): Promise<void> => {
  const eslint = new ESLint({ fix: true });
  const results = await eslint.lintFiles(['**/*.ts']);

  await ESLint.outputFixes(results);

  const formatter = await eslint.loadFormatter('stylish');

  // eslint-disable-next-line no-console
  console.log(formatter.format(results));
};
