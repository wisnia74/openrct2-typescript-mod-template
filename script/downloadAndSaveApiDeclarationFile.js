const fs = require('fs/promises');
const path = require('path');
const https = require('https');

const request = {
  get: (url) =>
    new Promise((resolve, reject) => {
      const req = https.get(url, (res) => {
        let result = '';

        res.on('error', reject);

        res.on('data', (chunk) => {
          result += chunk;
        });

        res.on('end', () => {
          resolve(result);
        });
      });

      req.on('error', reject);
      req.end();
    }),
};

(async () => {
  const apiDeclarationFileData = await request.get(
    'https://raw.githubusercontent.com/OpenRCT2/OpenRCT2/develop/distribution/openrct2.d.ts'
  );

  await fs.mkdir(path.join(process.cwd(), 'lib'), { recursive: true });
  await fs.writeFile(path.join(process.cwd(), 'lib', 'openrct2.d.ts'), apiDeclarationFileData);
})();
