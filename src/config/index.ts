import EnvVariableGetter from 'config/EnvVariableGetter';
import stringTypeCheckFunction from 'config/typeCheckFunctions';

const envVariableGetter = new EnvVariableGetter((key) => process.env[key]);

export default {
  MOD_NAME: envVariableGetter.getTypedEnvironmentVariable<string>('MOD_NAME', stringTypeCheckFunction),
  MOD_AUTHOR: envVariableGetter.getTypedEnvironmentVariable<string>('MOD_AUTHOR', stringTypeCheckFunction),
  MOD_URL: envVariableGetter.getTypedEnvironmentVariable<string>('MOD_URL', stringTypeCheckFunction),
};
