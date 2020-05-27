exports.createTypeScriptConfig = (outDir) => ({
  "compilerOptions": {
    "target": 'es5',
    "module": 'commonjs',
    "declaration": true,
    outDir,
    "strict": true,
  },
  "include": ['./src'],
  "exclude": ['node_modules', '**/__tests__/*'],
});

exports.createNodemonConfig = () => ({
  "events": {
    "restart": 'npm run build:develop',
  },
});

exports.createVsCodeConfig = () => ({
    "typescript.tsdk": "node_modules/typescript/lib",
});

exports.createEslintConfig = () => ({
  "env": {
      "browser": true,
      "es6": true,
      "node": true
  },
  "extends": [
      "airbnb-base"
  ],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaVersion": 11,
      "sourceType": "module"
  },
  "plugins": [
      "@typescript-eslint"
  ],
  "rules": {
      "no-undef": 0,
      "spaced-comment": 0,
      "max-len": ["error", { "code": 120 }]
  }
});

exports.createTemplateModFile = (modName, userName, modType, apiPath = null) => {
  let apiLine;

  if (apiPath) {
    apiLine = `/// <reference path="${apiPath}" />

`;
  } else {
    apiLine = '';
  }

  return `${apiLine}
const main = () => {
  console.log('Your plug-in has started!');
};

registerPlugin({
  name: '${modName}',
  version: '1.0',
  authors: ['${userName}'],
  type: '${modType}',
  main,
});  
`;
};

exports.createTemplateReadmeMd = (heading, text) => `# ${heading}

${text}
`;

module.exports = exports;
