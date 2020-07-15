Configuration in `init.json` is intended to be edited before you run `node init.js` in repo root directory.

The variables you **have** to specify yourself are:
- `userName`
- `modName`
- `modType`
- `openrct2ApiFilePath` if you will set `importOpenrct2Api` to `true`
- `openrct2PluginFolderPath`

You can leave the rest as they come with defaults. All of the variables are described below.

`openrct2ApiFilePath` and `openrct2PluginFolderPath` have a default value, however they need to be replaced by your paths - I just left mine inside so you have the idea where to look for these folder/files.

|variable|description|requires editing?|type|value
|--|--|--|--|--|
|`userName`|-|yes|string|any
|`modName`|-|yes|string|any
|`modType`|refer to [OpenRCT2 scripting guide](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md) for more info|yes|string|`remote` or `local`
|`licence`|-|no (default: `'MIT'`)|string|any
|`openrct2ApiFilePath`|full path to `openrct2.d.ts` OpenRCT2 TypeScript API declaration file|yes, if `config/importOpenrct2Api` set to `true`|string|any (it needs to be a valid path for it to work)
|`openrct2PluginFolderPath`|full path to OpenRCT2 `plugin` folder|yes|string|any (it needs to be a valid path for it to work)|
`config/pushToGithub`|if set as `true`, after finishing `node init.js` all the changes made by the script will get pushed to your GitHub repository|no (default: `false`)|boolean|`true` or `false`|
|`config/importOpenrct2Api`|if set as `true`, after finishing `node init.js` your template mod file (the one you are intended to work in and the compiled one) will contain OpenRCT2 TypeScript API imported|no (default: `true`)|boolean|`true` or `false`|
|`config/compileTemplateMod`|if set as `true`, after finishing `node init.js`, your template mod file that lives in genereted `./src/` directory will get compiled and placed inside `<openrct2PluginFolderPath>/<modName>/`|no (default: `true`)|boolean|`true` or `false`|
|`config/useStrictMode`|if set as `true`, after finishing `node init.js` your template mod file will contain `"use strict";` line at the top (will be in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode))| no (default:`false`)|boolean|`true` or `false`|
