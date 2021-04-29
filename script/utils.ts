import fs from 'fs';
import path from 'path';
import fetch, { Response } from 'node-fetch';
import config from 'config';

export const fetchApiDeclarationFileData = async (): Promise<string> => {
  const url = 'https://raw.githubusercontent.com/OpenRCT2/OpenRCT2/master/distribution/openrct2.d.ts';
  let data: Response;

  try {
    data = await fetch(url);
  } catch (err) {
    throw new Error('Could not fetch openrct2.d.ts API declaration file from OpenRCT2 GitHub');
  }

  return data.text();
};

export const createReadmeFileInLib = (text: string): void => fs.writeFileSync(path.join(config.paths.lib, 'README.md'), text);
