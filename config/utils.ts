import fs from 'fs';
import path from 'path';

const getResolvedPath = (relativePath: string): string => {
  const currentDir = process.cwd();
  const pathResolvedRelatively = path.join(currentDir, relativePath);

  if (!fs.existsSync(pathResolvedRelatively)) throw new Error(`${pathResolvedRelatively} does not exist.`);

  return pathResolvedRelatively;
};

export default getResolvedPath;
