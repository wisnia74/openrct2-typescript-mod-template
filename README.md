
# openrct2-mod-template
Template repository for OpenRCT2 mods.

## About
This repository was created to serve as a template mod repository for OpenRCT2.
OpenRCT2 gives you `hot reload` feature ([OpenRCT2 hot reload](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md#writing-scripts)). I wanted to leverage that using `nodemon` to start a local server (that's why empty `app.js` in root dir, as an entry point) that will watch your `.ts` files in `src` directory, and everytime you save them, it will convert them to `.js` files and place them in a specified location.

## Usage
- edit `tsconfig.json` - specify `outDir` (preferably set it as your OpenRCT2 `plugin` folder path, as `hot reload` watches exactly that directory)
- edit/create your `.ts` file/-s in `src` - I've included a template file there, though if you want to import OpenRCT2 APIs, you need to replace `<path>` with path to `openrct2.d.ts` in `<reference path="<path>" />`
- run `npm run develop` - it will start a local server that will be watching changes in all of your `.ts` files in `src`
- start OpenRCT2 using `openrct2.com` - it will start along with a console
- start a new park/load your save - mods start/reload only when you have a running park in game
- write your code and save the file/-s
- each time you save, `nodemon` will run `typescript` to compile files to `.js`, and OpenRCT2 `hot reload` feature will reload them in real time

Voila! You can now write your mods in real time, wasting little to no time for building, giving you more time to debug :)

Note: After cloning your own repository, that was based on this one, I recommend deleting `package.json` and `package-lock.json` and running `npm init` on your own.

## Known issues
- If you are having problem with running `npm run build` or `npm run build-develop` (related to `tsc` not being recognized), refer to [this](https://code.visualstudio.com/docs/typescript/typescript-compiling#_compiler-versus-language-service) article.

## Notes
I've included `npm run build` feature that will first lint your code, and then compile all the files. That might come in handy when you want to generate final version of your mod files. To suit your needs, just modify the behavior of `nodemon`, `eslint` and `typescript`.

### Useful links
- [OpenRCT2 on GitHub](https://github.com/OpenRCT2)
- [OpenRCT2 on Reddit](https://www.reddit.com/r/openrct2)
- [OpenRCT2 plugins website](https://openrct2plugins.org/)
- [OpenRCT2 example plugins repository](https://github.com/OpenRCT2/plugin-samples)
- [OpenRCT2 scripting guide](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md)
- [OpenRCT2 hot reload feature presentation](https://www.youtube.com/watch?v=jmjWzEhmDjk)
