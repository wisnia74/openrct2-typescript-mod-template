// replace below with your path to OpenRCT2 - usually on C:/Users/<user>/Documents
/// <reference path="<path_to_openrct2>/bin/openrct2.d.ts" />

const main = () => {
  console.log('Your plug-in has started!');
};

registerPlugin({
  name: 'MOD_NAME',
  version: '1.0',
  authors: ['USERNAME'],
  type: 'MOD_TYPE',
  licence: 'MIT',
  main,
});
