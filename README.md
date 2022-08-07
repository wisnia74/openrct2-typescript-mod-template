# 🎢 openrct2-typescript-mod-template

Template repository for OpenRCT2 mods written in TypeScript.

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
  - [How it works](#how-it-works)
- [Releasing your mod](#releasing-your-mod)
- [Notes](#notes)
- [Useful links](#useful-links)

## About

This repository was created to serve as a template TypeScript mod repository for OpenRCT2.

I wanted to leverage [OpenRCT2 hot reload feature](https://github.com/OpenRCT2/OpenRCT2/blob/master/distribution/scripting.md#writing-scripts) to make it even more painless to write and debug mods in real time.

This template repository comes with [TypeScript](https://www.typescriptlang.org/), [Rollup](https://rollupjs.org), [ESLint](https://eslint.org/) and [Jest](https://jestjs.io/) on board.

## Installation

1. Install latest versions of [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm)
2. [Create your own repository using this one as a template](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) and clone it anywhere to your PC
3. `cd` into it and edit fields in `./config/default.json`
   - `MOD_NAME` - self explanatory
   - `MOD_AUTHOR` - self explanatory
   - `MOD_URL` is supposed to be a link to your repository on GitHub (the one you've created in a previous step)
4. Find `openrct2.d.ts` TypeScript API declaration file in OpenRCT2 files and copy it to `lib` folder (this file can usually be found in `C:\Users\<USER>\Documents\OpenRCT2\bin` or `C:\Program Files\OpenRCT2`)
   - alternatively, you can make a symbolic link through command prompt/terminal on your OS (example: `mklink` on Windows)
5. Create `local-dev.json` file inside `./config` folder, it should look like the following:

```json
{
  "OPENRCT2_PATH": "PATH_TO_OPENRCT2"
}
```

- replace `PATH_TO_OPENRCT2` with correct path to OpenRCT2 folder on your machine (same path as in step 4)
- make sure to replace any forward slashes (`/`) or backslashes (`\`) in your path, with escaped backslashes (`\\`)

6. Run `npm run init` and wait for it to finish

If you want to alter plugin data, refer to [OpenRCT2 scripting guide](https://github.com/OpenRCT2/OpenRCT2/blob/master/distribution/scripting.md).

## Usage

1. Make sure you've enabled [OpenRCT2 hot reload feature](https://github.com/OpenRCT2/OpenRCT2/blob/master/distribution/scripting.md#writing-scripts) by setting `enable_hot_reloading = true` in your `/OpenRCT2/config.ini`
2. `cd` into repo
3. run `npm start:dev` (this will place compiled and minified mod file inside `PATH_TO_OPENRCT2/plugin/` directory and inside `dist` directory inside the repo)

Prod builds can be done through `npm start` and `npm run build` respectively.

### How it works

Your mod files live in `./src/` directory. That's the ones you will be writing code in most of the time.

Upon starting Rollup, it will start watching changes you make to files in `./src/`, and it will build them accordingly.

The entry point is `./src/index.ts`. Any file, class, module you create in `./src/` needs to be imported to `registerPlugin.ts` one way or another.

Template uses [Terser](https://github.com/terser/terser) to minify your output mod bundle file and to resolve any dependencies.

## Releasing your mod

After running `npm run build` locally, `./dist/` directory will be created that will contain `MOD_NAME.js`.
It's up to you, if you want to edit `.gitignore` to actually include `./dist/` contents and push them to your remote or if you want to manually copy the contents of `./dist/` and publish them somewhere. However creating a GitHub release using contents of `./dist/` directory sounds like a cool idea. You would have your mod file available for download straight from the repo.
Don't forget to update `README.md` to reflect your mod and update version numbers for future releases.

## Notes

- If you've added a new mod folder to `plugin`, and the OpenRCT2 didn't seem like it registered it (and you had a running park), just load the save/start a new park, so OpenRCT2 loads the mods again. Now when you overwrite them during development, there shouldn't be any problems with hot reload noticing file changes.

- Template comes with full Jest support however if you'll want to add tests that will be meaningful, you will need to mock a lot of things coming from the `openrct2.d.ts` - refer to `jest.setup.ts` I've created to see what I mean

- Template uses [config](https://www.npmjs.com/package/config) npm package to utilize different environments - new ones can be added simply adding a new `<env_name>.json` file to `./config` folder and adding a corresponding `rollup.config.<env>.ts`, refer to [config docs](https://github.com/node-config/node-config/wiki) for more info on how env vars are getting loaded

## Useful links

- [OpenRCT2 website](https://openrct2.io/)
- [OpenRCT2 on GitHub](https://github.com/OpenRCT2)
- [OpenRCT2 on Reddit](https://www.reddit.com/r/openrct2)
- [OpenRCT2 plugins website](https://openrct2plugins.org/)
- [OpenRCT2 example plugins repository](https://github.com/OpenRCT2/plugin-samples)
- [OpenRCT2 scripting guide](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md)
- [OpenRCT2 hot reload feature presentation](https://www.youtube.com/watch?v=jmjWzEhmDjk)
