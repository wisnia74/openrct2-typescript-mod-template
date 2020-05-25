


# 🔨 openrct2-typescript-mod-template
Template repository for OpenRCT2 mods written in TypeScript.

## About
This repository was created to serve as a template TypeScript mod repository for OpenRCT2.

I wanted to leverage [OpenRCT2 hot reload](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md#writing-scripts) to make it even more painless to write and debug mods in real time.

This template repository comes with [Nodemon](https://nodemon.io/), [ESLint](https://eslint.org/) and [TypeScript](https://www.typescriptlang.org/) on board.

The idea was to use Nodemon to start a local server that will be watching your mod files, then on each save make it build `.ts` files to `.js`, place them inside OpenRCT2 `plugin` directory, and let hot reload feature do the rest (i.e. reload the mod in-game).

## Configuration
- install [Node](https://nodejs.org/en/)
- install [npm](https://www.npmjs.com/get-npm)
- create your own repository using this one as a template
- clone it anywhere to your PC
- `cd` into it
- edit `init.json` and replace the following:
	- `userName` and `modName` - self explanatory, though it's worth noting, that these will land in OpenRCT2 `registerPlugin()` function call
	- `openrct2ApiFilePath` - full path to `openrct2.d.ts` TypeScript API declaration file
	- `openrct2PluginFolderPath` - full path to OpenRCT2 `plugin` folder
	- **NOTE**: I left my own paths there for reference, yours might be different - just replace them
- run `node init.js` in console
	- it will run `npm init` for you
	- **IMPORTANT**: leave `entry` as `init.js` - at the end of a script run it will be recreated as an empty file and it well serve as an entry point for Nodemon server
	- you can `enter` through the rest, if you want to be fancy, specify `license` as `MIT` because `LICENSE` file will get copied from this template repo and will be included in yours (`npm init` doesn't generate `LICENSE` file)
	- after `npm init` is done, the script will create Nodemon and TypeScript config files, as well as `./src/mod.ts` as an example mod file with imported OpenRCT2 TypeScript API declaration and then, it will run `npm install` to install all dependencies
	- last but not least, it will `git add .`, `git commit` and `git push` to your repository
- you now have a clean repository and npm package configured, so you can start modding

## Usage

Click image below to see YouTube video showing this template in action.

[![OpenRCT2 TypeScript mod template presentation](http://img.youtube.com/vi/jXORMxoQmwU/0.jpg)](http://www.youtube.com/watch?v=jXORMxoQmwU "OpenRCT2 TypeScript mod template presentation")

- `npm start` starts Nodemon server that will watch for any changes you make to your `.ts` files inside `./src` directory (i.e. it will detect when you save a file)
	- once it detects them, it will build `.ts` files to ES5 `.js` files and place them inside `<openrct2PluginFolderPath>/<modName>` that you've specified before running `node init.js`
	- OpenRCT2 hot reload feature will detect changes to files in this directory and it will reload your mods in real time (assuming that you have a running park)
- `npm run build:develop` will perform just the `.ts` -> `.js` compilation step of `npm run start` (i.e. will not start a server)
- `npm run build` will run `npm run lint` to lint your code and then build `.ts` files from `./src` to `.js` files, and place them all in `./dist` directory - those are the final mod files that you can share with others

### Notes
If you've added a new mod folder to `plugin`, and the OpenRCT2 didn't seem likt it registered it (and you had a running park), just load the save/quit to menu and load the save/start a new park, so OpenRCT2 loads the mods again. Now when you overwrite them during development, there shouldn't be any problems with hot reload noticing file changes.

### Useful links
- [OpenRCT2 website](https://openrct2.io/)
- [OpenRCT2 on GitHub](https://github.com/OpenRCT2)
- [OpenRCT2 on Reddit](https://www.reddit.com/r/openrct2)
- [OpenRCT2 plugins website](https://openrct2plugins.org/)
- [OpenRCT2 example plugins repository](https://github.com/OpenRCT2/plugin-samples)
- [OpenRCT2 scripting guide](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md)
- [OpenRCT2 hot reload feature presentation](https://www.youtube.com/watch?v=jmjWzEhmDjk)
