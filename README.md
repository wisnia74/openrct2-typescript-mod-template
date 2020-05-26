





# 🎢 openrct2-typescript-mod-template

Template repository for OpenRCT2 mods written in TypeScript.

## About

This repository was created to serve as a template TypeScript mod repository for OpenRCT2.

I wanted to leverage [OpenRCT2 hot reload feature](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md#writing-scripts) to make it even more painless to write and debug mods in real time.

This template repository comes with [Nodemon](https://nodemon.io/), [ESLint](https://eslint.org/) and [TypeScript](https://www.typescriptlang.org/) on board.

The idea was to use Nodemon to start a local server that will be watching your mod files, then on each save make it build `.ts` files to ES5 `.js` files, place them inside OpenRCT2 `plugin` directory, and let hot reload feature do the rest (i.e. reload the mod in-game).

## Configuration

- install [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm)
- create your own repository using this one as a template and clone it anywhere to your PC
- `cd` into it and edit `init.json`:

|variable to edit|description|used in|
|--|--|--|
|`userName`|self explanatory|OpenRCT2 `registerPlugin()` function call in `./src/mod.ts`|
|`modName`|self explanatory|OpenRCT2 `registerPlugin()` function call in `./src/mod.ts` and in TypeScript config files (`tsconfig-develop.json` and `tsconfig-prod.json`)|
|`modType`|set as `remote` if your mod will alter the game state, otherwise to `local` - refer to [OpenRCT2 scripting guide](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md) for more info|OpenRCT2 `registerPlugin()` function call in `./src/mod.ts`|
|`openrct2ApiFilePath`|full path to `openrct2.d.ts` OpenRCT2 TypeScript API declaration file|`<reference />` tag in `./src/mod.ts` example TypeScript mod file|
|`openrct2PluginFolderPath`|full path to OpenRCT2 `plugin` folder|TypeScript config files (`tsconfig-develop.json` and `tsconfig-prod.json`)|

**NOTE**: I left my own paths in `openrct2ApiFilePath` and `openrct2PluginFolderPath` for reference - in case yours are entirely different, just replace them.

- run `node init.js`
    - when the script runs `npm init` to generate your npm package, leave `entry` as `init.js`
    - everything else is optional
    - the script will push all the changes to your repository at the end

- you now have a clean repository and npm package configured, so you can start modding :)

## Usage

#### npm scripts:
|script|function|
|--|--|
|`npm start`|starts Nodemon server that will be watching `./src` folder for any changes you make to `.ts` files inside it|
|`npm run lint`|lints your `.ts` files from `./src` directory|
|`npm run build:develop`|compiles all `.ts` files from `./src` to ES5 `.js` files, and places them inside `<openrct2PluginFolderPath>/<modName>`|
|`npm run build`|runs `npm run lint` and if no linting errors are found, compiles your `.ts` files to ES5 `.js` files and places them inside `./dist` folder - those are your final mod files|

#### Modding:
- run `npm start`
- launch OpenRCT2 (using `.com` file if you're on Windows, so it will start along with the console)
- start a park/load save
- write code then save the file
- OpenRCT2 hot reload feature will reload mods in real time, once it detects changes to files in `plugin` directory

#### Template presentation
Click on the image below to see a YouTube video.

[![OpenRCT2 TypeScript mod template presentation](http://img.youtube.com/vi/XV6IDEebZXA/0.jpg)](http://www.youtube.com/watch?v=XV6IDEebZXA "OpenRCT2 TypeScript mod template presentation")

## Notes
If you've added a new mod folder to `plugin`, and the OpenRCT2 didn't seem likt it registered it (and you had a running park), just load the save/quit to menu and load the save/start a new park, so OpenRCT2 loads the mods again. Now when you overwrite them during development, there shouldn't be any problems with hot reload noticing file changes.

## Useful links
- [OpenRCT2 website](https://openrct2.io/)
- [OpenRCT2 on GitHub](https://github.com/OpenRCT2)
- [OpenRCT2 on Reddit](https://www.reddit.com/r/openrct2)
- [OpenRCT2 plugins website](https://openrct2plugins.org/)
- [OpenRCT2 example plugins repository](https://github.com/OpenRCT2/plugin-samples)
- [OpenRCT2 scripting guide](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md)
- [OpenRCT2 hot reload feature presentation](https://www.youtube.com/watch?v=jmjWzEhmDjk)
