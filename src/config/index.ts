import Env from '~/config/Env';

export default new Env(process.env, (key) => process.env[key]);
