import { stringTypeCheckFunction } from '../utils/typeCheckFunctions';

type EnvMap = { [x: string]: unknown };

type EnvMapVarGetter = (key: string) => unknown;

export default class {
  private envMap: EnvMap;

  private getEnvMapVar: EnvMapVarGetter;

  constructor(envMap: EnvMap, getEnvMapVar: EnvMapVarGetter) {
    this.envMap = envMap;
    this.getEnvMapVar = getEnvMapVar;
  }

  getMap(): EnvMap {
    return this.envMap;
  }

  private getTypedEnvironmentVariable<T>(key: string, typeCheckFunction: (val: unknown) => val is T): T {
    const val = this.getEnvMapVar(key);

    if (!typeCheckFunction(val)) throw new Error(`${key} has invalid type`);

    return val;
  }

  getString(key: string): string {
    return this.getTypedEnvironmentVariable(key, stringTypeCheckFunction);
  }
}
