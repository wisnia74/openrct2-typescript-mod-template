import { ESLint } from 'eslint';

export default async function lintFix(): Promise<void> {
  const eslint = new ESLint({ fix: true });
  const results = await eslint.lintFiles(['**/*.ts']);
  const formatter = await eslint.loadFormatter('stylish');

  // eslint-disable-next-line no-console
  console.log(formatter.format(results));

  return ESLint.outputFixes(results);
}
