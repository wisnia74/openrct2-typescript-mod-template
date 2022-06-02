import fs from 'fs';

export default (pathname: fs.PathOrFileDescriptor): Record<string, unknown> =>
  <Record<string, unknown>>JSON.parse(fs.readFileSync(pathname).toString());
