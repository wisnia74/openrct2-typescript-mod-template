import EnvConfig from './Env';
import config from 'config';

export default new EnvConfig({ ...config, NODE_ENV: process.env.NODE_ENV });
