import config from 'config';
import EnvConfig from './Env';

export default new EnvConfig({ ...config, NODE_ENV: process.env.NODE_ENV });
