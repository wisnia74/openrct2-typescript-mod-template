import dotenv from 'dotenv';

dotenv.config({ path: `./.env.${process.env.NODE_ENV || 'prod'}` });

export default {
  MOD_NAME: process.env.MOD_NAME || 'MISSING_MOD_NAME',
  MOD_AUTHOR: process.env.MOD_AUTHOR || 'MISSING_MOD_AUTHOR',
  OPENRCT2_PATH: process.env.OPENRCT2_PATH || 'MISSING_OPENRCT2_PATH',
};
