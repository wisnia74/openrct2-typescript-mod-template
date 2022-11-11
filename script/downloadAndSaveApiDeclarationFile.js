import { promises as fs } from 'fs';
import path from 'path';

(async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/OpenRCT2/OpenRCT2/develop/distribution/openrct2.d.ts'
  );

  const text = await response.text();

  await fs.writeFile(path.join(process.cwd(), 'lib', 'openrct2.d.ts'), text);
})();
