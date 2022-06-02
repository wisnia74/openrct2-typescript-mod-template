import EnvVariableGetter from '../EnvVariableGetter';
import stringTypeCheckFunction from '../typeCheckFunctions';

describe('class EnvVariableGetter', () => {
  it('retrieves environment variable if it exists and passes type check', () => {
    const envVariableGetter = new EnvVariableGetter((key) => ({ key1: 'value1', key2: 'value2' }[key]));

    expect(envVariableGetter.getTypedEnvironmentVariable<string>('key1', stringTypeCheckFunction)).toBe('value1');
  });

  it('throws error if type check did not pass', () => {
    const envVariableGetter = new EnvVariableGetter((key) => ({ key1: 12345, key2: 'value2' }[key]));

    expect(() => envVariableGetter.getTypedEnvironmentVariable<string>('key1', stringTypeCheckFunction)).toThrow(
      'key1 has invalid type'
    );
  });

  it('throws error if variable was not found', () => {
    const envVariableGetter = new EnvVariableGetter((key) => ({ key1: 12345, key2: 'value2' }[key]));

    expect(() => envVariableGetter.getTypedEnvironmentVariable<string>('key3', stringTypeCheckFunction)).toThrow(
      'key3 has invalid type'
    );
  });
});
