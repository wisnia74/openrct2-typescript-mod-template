


# 🔨 openrct2-typescript-mod-template
Template repository for OpenRCT2 mods written in TypeScript.

## About
This repository was created to serve as a template TypeScript mod repository for OpenRCT2.

I wanted to leverage [OpenRCT2 hot reload](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md#writing-scripts) to make it even more painless to write and debug mods in real time.

This template repository comes with [Nodemon](https://nodemon.io/), [ESLint](https://eslint.org/) and [TypeScript](https://www.typescriptlang.org/) on board.

The idea was to use Nodemon to start a local server that will be watching your mod files, then on each save make it build `.ts` files to ES5 `.js` files, place them inside OpenRCT2 `plugin` directory, and let hot reload feature do the rest (i.e. reload the mod in-game).

## Configuration
- install [Node](https://nodejs.org/en/)
- install [npm](https://www.npmjs.com/get-npm)
- create your own repository using this one as a template
- clone it anywhere to your PC
- `cd` into it
- edit `init.json` and replace the following:
	- `userName` and `modName` - self explanatory, though it's worth noting, that these will land in OpenRCT2 `registerPlugin()` function call
	- `openrct2ApiFilePath` - full path to `openrct2.d.ts` TypeScript API declaration file (more info about it in [OpenRCT2 scripting guide](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md))
	- `openrct2PluginFolderPath` - full path to OpenRCT2 `plugin` folder
	- **NOTE**: I left my own paths there for reference, yours might be different - just replace them
- run `node init.js`
	- it'll `npm init` that you have to complete
	- **IMPORTANT**: leave `entry` as `init.js`
	- you can `enter` through the rest, if you fancy though, you can specify `license` to be `MIT` instead of `ISC`
	- after `npm init` finishes, the script will create Nodemon and TypeScript config files, as well as `./src/mod.ts` as an example mod file with imported OpenRCT2 TypeScript API declaration
	- it'll also run `npm install` to install dependencies
	- at the end it'll `git add .`, `git commit` and `git push` to your repository
- you now have a clean repository and npm package configured, so you can start modding

## Usage

Click image below to see YouTube video showing this template in action.

[![OpenRCT2 TypeScript mod template presentation](http://img.youtube.com/vi/jXORMxoQmwU/0.jpg)](http://www.youtube.com/watch?v=jXORMxoQmwU "OpenRCT2 TypeScript mod template presentation")

NPM scripts:
- `npm start` starts Nodemon server that will watch `.ts` files inside `./src` directory and once it detects changes, it'll build `.ts` files to ES5 `.js` files and place them inside `<openrct2PluginFolderPath>/<modName>`
- `npm run build:develop` will only compile `.ts` files and place them inside `<openrct2PluginFolderPath>/<modName>`
- `npm run build` will run `npm run lint` to lint your code and then, if linting succeeds, it'll compile `.ts` files from `./src`, and place them all in `./dist` directory - those are the final mod files that you can share with others

Modding:
- run `npm start`
- launch OpenRCT2 using `.com` file, not `.exe` (this way it will start along with the console)
- start a park/load save
- write code then save the file
- OpenRCT2 hot reload feature will reload mods in real time, once it detects changes to files in `plugin` directory

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
