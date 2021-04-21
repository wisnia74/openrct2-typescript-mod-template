import fetch from 'node-fetch';

const fetchApiDeclarationFileData = async () => {
  const url = 'https://raw.githubusercontent.com/OpenRCT2/OpenRCT2/develop/distribution/openrct2.d.ts';
  const data = await fetch(url);

  return data.text();
};

export default fetchApiDeclarationFileData;
