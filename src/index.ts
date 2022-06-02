import config from './config';
import main from './main';

registerPlugin({
  name: config.MOD_NAME,
  version: '1.0',
  authors: [config.MOD_AUTHOR],
  type: 'local',
  licence: 'MIT',
  main,
});
