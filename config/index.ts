import config from 'config';
import Env from './Env';

export default new Env({ ...config }, (key) => config.get(key));
