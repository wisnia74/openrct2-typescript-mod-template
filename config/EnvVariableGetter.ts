export default class {
  private getterFunc: (key: string) => unknown;

  constructor(getterFunc: (key: string) => unknown) {
    this.getterFunc = getterFunc;
  }

  getTypedEnvironmentVariable<T>(key: string, typeCheckFunction: (val: unknown) => val is T): T {
    const val = this.getterFunc(key);

    if (!typeCheckFunction(val)) throw new Error(`${key} has invalid type`);

    return val;
  }
}
