/// <reference path="../lib/openrct2.d.ts" />

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
