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

  fs.mkdirSync(config.paths.lib);
  fs.writeFileSync(path.join(config.paths.lib, 'openrct2.d.ts'), data);
};

export const replaceTextInFile = (filepath: fs.PathLike, searchReplaceValuePairs: SearchReplaceValuePair[]): void => {
  const content = fs.readFileSync(filepath).toString();
  let modifiedContent = content;

  searchReplaceValuePairs.forEach(({ searchValue, replaceValue }) => {
    modifiedContent = modifiedContent.replace(searchValue, replaceValue);
  });

  fs.writeFileSync(filepath, modifiedContent);
};

export const replaceTextInFiles = (
  filepaths: fs.PathLike[],
  searchReplaceValuePairs: SearchReplaceValuePair[]
): void => {
  filepaths.forEach((filepath) => {
    replaceTextInFile(filepath, searchReplaceValuePairs);
  });
};
