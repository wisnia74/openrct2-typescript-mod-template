import config from './config';
import main from './main';

registerPlugin({
  name: config.getString('MOD_NAME'),
  version: '1.0',
  authors: [config.getString('MOD_AUTHOR')],
  type: 'local',
  licence: 'MIT',
  main,
});
