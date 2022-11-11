import { promises as fs } from 'fs';
import path from 'path';
import paths from './paths';

export default async (): Promise<void> => {
  const response = await fetch(
    'https://raw.githubusercontent.com/OpenRCT2/OpenRCT2/develop/distribution/openrct2.d.ts'
  );

  const text = await response.text();

  await fs.writeFile(path.join(paths.lib, 'openrct2.d.ts'), text);
};
