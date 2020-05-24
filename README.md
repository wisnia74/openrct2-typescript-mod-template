

# openrct2-mod-template
Template repository for OpenRCT2 mods written in TypeScript.

## About
This repository was created to serve as a template TypeScript mod repository for OpenRCT2.

I wanted to leverage [OpenRCT2 hot reload](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md#writing-scripts) to make it even more painless to write and debug mods in real time.

This template repository comes with [Nodemon](https://nodemon.io/), [ESLint](https://eslint.org/) and [TypeScript](https://www.typescriptlang.org/) on board.

The idea was to use Nodemon to start a local server that will be watching your mod files, then on each save make it build `.ts` files to `.js`, place them inside OpenRCT2 `plugin` directory, and let hot reload feature do the rest (i.e. reload the mod in-game).

## Configuration
- create your own mod repository that will use this one as a template
- clone it to your PC
- go inside your repository folder and open `package.json`
- copy `scripts` and `devDependencies` property contents (i.e. everything between `{}` curly braces)
- run `npm init` and go through the init process, to create your own package
- replace `scripts` in newly generated `package.json` with the ones you copied earlier
- add copied earlier `devDependencies`, below `homepage` property
- open `tsconfig-develop.json` and replace `<path_to_OpenRCT2_plugin_folder>/<your_mod_folder>`
- open `tsconfig-prod.json` and replace `<your_mod_name>` with... your mod name :)
- if you want to start right off the bat, open `./src/temp.ts` and replace `<reference path="<path>" />` with an actual path to `openrct2.d.ts` that lives in OpenRCT2 `bin` folder (or your OpenRCT2 folder, if you've installed just OpenRCT2, not OpenRCT2 launcher) - this is needed to have a code reference to OpenRCT2 JavaScript APIs
- run `npm install` and you should be good to go

## Usage
- run `npm start` - it will launch`nodemon` server that will start to monitor any changes you make to `.ts` files in `./src` directory
- start OpenRCT2 using `openrct2.com` - it will start along with a console
- start/load park - plugins start/reload only when there's an active park in-game
- write your code and save
- upon saving, `nodemon` will restart the server, thus triggering `npm run build:develop` that will compile your files and send them to the path you've specified in `tsconfig-develop.json` (`OpenRCT2/plugin/<your_mod_folder>`)
- OpenRCT2 hot reload feature will notice changes you've made to `.js` files in this directory and it will reload all the mods - this will allow you to write mods nearly in real time, you'll just need to hit `ctrl+s` from time to time
- once you've finished writing your mod, close `nodemon` server and run `npm run build` - this one will lint your code, and if everything's good it will compile your mod files to `./dist/<your_mod_name>`

### Useful links
- [OpenRCT2 on GitHub](https://github.com/OpenRCT2)
- [OpenRCT2 on Reddit](https://www.reddit.com/r/openrct2)
- [OpenRCT2 plugins website](https://openrct2plugins.org/)
- [OpenRCT2 example plugins repository](https://github.com/OpenRCT2/plugin-samples)
- [OpenRCT2 scripting guide](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md)
- [OpenRCT2 hot reload feature presentation](https://www.youtube.com/watch?v=jmjWzEhmDjk)
