import path from 'path';
import fs from 'fs';
import fetch, { Response } from 'node-fetch';
import config from 'config';
import { SearchReplaceValuePair } from './types';

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

export const createApiDeclarationFile = async (): Promise<void> => {
  const data = await fetchApiDeclarationFileData();

  fs.writeFileSync(path.join(config.paths.lib, 'openrct2.d.ts'), data);
};

export const replaceDataInFiles = (
  filepaths: fs.PathLike[],
  searchReplaceValuePairs: SearchReplaceValuePair[],
): void => {
  filepaths.forEach((filepath) => {
    const fileContent = fs.readFileSync(filepath).toString();
    let modifiedFileContent = fileContent;

    searchReplaceValuePairs.forEach(({ searchValue, replaceValue }) => {
      modifiedFileContent = modifiedFileContent.replace(searchValue, replaceValue);
    });

    fs.writeFileSync(filepath, modifiedFileContent);
  });
};
