// replace <path> with your path to openrct2.d.ts (usually it's C:\Users\<user>\Documents\OpenRCT2\bin\openrct2.d.ts)
// you will need to do that in each .ts file you'll want to use OpenRCT2 APIs in

/// <reference path="<path>" />

const main = () => {
  console.log('Your plug-in has started!');
};

registerPlugin({
  name: '<your_plugin_name>',
  version: '1.0',
  authors: ['<your_name>'],
  type: '<type>',
  main,
});
