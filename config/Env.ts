import { isString } from '../utils/typeCheckFunctions';

type EnvConfigObject = { [x: string]: unknown };

export default class {
  private envConfigObject: EnvConfigObject;

  constructor(envConfigObject: EnvConfigObject) {
    this.envConfigObject = envConfigObject;
  }

  has(key: string): boolean {
    return !!this.envConfigObject[key];
  }

  private get(key: string): unknown {
    return this.envConfigObject[key];
  }

  getEnvConfigObject(): EnvConfigObject {
    return this.envConfigObject;
  }

  private getTypedEnvVar<T>(key: string, isOfType: (val: unknown) => val is T): T {
    const val = this.get(key);

    if (!isOfType(val)) throw new Error();

    return val;
  }

  getString(key: string): string {
    try {
      return this.getTypedEnvVar(key, isString);
    } catch {
      throw new Error(`${key} has invalid type - expected string but got ${typeof this.envConfigObject[key]}`);
    }
  }
}
