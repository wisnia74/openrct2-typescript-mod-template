import { ESLint } from 'eslint';

export default async (): Promise<void> => {
  const eslint = new ESLint();
  const results = await eslint.lintFiles(['**/*.ts']);
  const formatter = await eslint.loadFormatter('stylish');

  // eslint-disable-next-line no-console
  console.log(formatter.format(results));
};
