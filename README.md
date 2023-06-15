# DISCONTINUED, TREAT IT LIKE A MODDERS RESOURCE

# 🎢 openrct2-typescript-mod-template

Template repository for OpenRCT2 mods written in TypeScript.

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
  - [Hot reload](#hot-reload)
  - [How it works](#how-it-works)
- [Releasing your mod](#releasing-your-mod)
- [Notes](#notes)
- [Useful links](#useful-links)

## About

This repository was created to serve as a template TypeScript mod repository for OpenRCT2.
I wanted to leverage [OpenRCT2 hot reload feature](https://github.com/OpenRCT2/OpenRCT2/blob/master/distribution/scripting.md#writing-scripts) to make it even more painless to write and debug mods in real time.

This template repository comes with:

- [TypeScript](https://www.typescriptlang.org/)
- [Rollup](https://rollupjs.org)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [gulp](https://gulpjs.com/)

## Installation

1. Install [Node](https://nodejs.org/en/) `v.18.12.1` (it comes with [npm](https://www.npmjs.com/get-npm) by default)

2. [Create your own repository using this one as a template](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) and clone it

3. Open cloned repository and modify `./config/default.json`:

- `MOD_NAME` - self explanatory
- `MOD_AUTHOR` - self explanatory
- `MOD_URL` - this is supposed to be a link to your mod repository on GitHub

4. Create `local-dev.json` file inside `./config` folder, copy below code inside it:

```json
{
  "OPENRCT2_PATH": "PATH_TO_OPENRCT2"
}
```

- replace `PATH_TO_OPENRCT2` with correct path to OpenRCT2 folder on your PC (usually `C:\Users\<USER>\Documents\OpenRCT2` or `C:\Program Files\OpenRCT2`)
- make sure to use either escaped backslashes (`\\`) or forward slashes (`/`) in the path you're pasting

6. Run `nvm use && npm install && npm run init`

If you want to alter plugin data, refer to [OpenRCT2 scripting guide](https://github.com/OpenRCT2/OpenRCT2/blob/master/distribution/scripting.md).

Part of the `npm run init` is downloading the latest [OpenRCT2 TypeScript API declaration file](https://github.com/OpenRCT2/OpenRCT2/blob/master/distribution/openrct2.d.ts) and saving it to `lib` folder (CI pipeline does the same to ensure build and tests passing). If you'll want to use previous API declaration files (e.g. you want to write a mod for some previous version of OpenRCT2), you will need to replace `openrct2.d.ts` file in `lib` with your own (e.g. coming from your current game folder, usually `C:\Users\<user>\Documents\OpenRCT2\bin` or `C:\Program Files\OpenRCT2\bin`).

## Usage

### Hot reload

1. Make sure you've enabled [OpenRCT2 hot reload feature](https://github.com/OpenRCT2/OpenRCT2/blob/master/distribution/scripting.md#writing-scripts)
2. Run the project:

- `npm run start:dev` if you want to generate a dev build
- `npm run start` if you want to generate a prod build
- both command bundle mod files to `dist` and to `{PATH_TO_OPENRCT2}/plugin`
- dev builds are suffixed with `_dev`

### How it works

The template assumes your mod files will live in `src` folder.
After running `npm run start` or `npm run start:dev`, Rollup will start watching files in `src` and trigger a build anytime you save the file. The entry point is `src/index.ts`.
Template uses [Terser](https://github.com/terser/terser) to minify your output mod bundle file and to resolve any dependencies.

## Releasing your mod

After running `npm run build` locally, `dist` directory will be created that will contain `MOD_NAME.js`.
From there, you can release it however you want.

## Notes

- If you've added a new mod folder to `{PATH_TO_OPENRCT2}/plugin`, and the OpenRCT2 didn't register it (e.g. you had a running park), just load the save/start a new park so OpenRCT2 loads the mods again. Now when you overwrite them during development, there shouldn't be any problems with hot reload noticing file changes.

- Template comes with full Jest support however if you'll want to add tests that will be meaningful, you will need to mock a lot of things coming from the `openrct2.d.ts` - refer to `jest.setup.ts` I've created to see how it can be done

- Template uses [config](https://www.npmjs.com/package/config) npm package to utilize different environments - new ones can be added simply by adding a new `<env_name>.json` file to `config` folder and adding a corresponding `rollup.config.<env>.ts`, refer to [config documentation](https://github.com/node-config/node-config/wiki) for more details

## Useful links

- [OpenRCT2 website](https://openrct2.io/)
- [OpenRCT2 on GitHub](https://github.com/OpenRCT2)
- [OpenRCT2 on Reddit](https://www.reddit.com/r/openrct2)
- [OpenRCT2 plugins website](https://openrct2plugins.org/)
- [OpenRCT2 example plugins repository](https://github.com/OpenRCT2/plugin-samples)
- [OpenRCT2 scripting guide](https://github.com/OpenRCT2/OpenRCT2/blob/develop/distribution/scripting.md)
- [OpenRCT2 hot reload feature presentation](https://www.youtube.com/watch?v=jmjWzEhmDjk)
