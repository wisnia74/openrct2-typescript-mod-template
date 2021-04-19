import fs from 'fs';
import path from 'path';

const getResolvedPath = (relativePath: string): string => {
  const currentDir = fs.realpathSync(process.cwd());
  const pathResolvedRelatively = path.resolve(currentDir, relativePath);

  if (!fs.existsSync(pathResolvedRelatively)) throw new Error(`${pathResolvedRelatively} doesn't exist.`);

  return pathResolvedRelatively;
};

export default getResolvedPath;
