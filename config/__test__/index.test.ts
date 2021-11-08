import config from '../index';

jest.mock('config/utils');

describe('root config module', () => {
  it('exports config object with correct values', () => {
    expect(config).toStrictEqual({
      entrypoint: 'Path\\To\\Node.exe',
      flag1: 'value1',
      flag2: 'value2',
      paths: {
        config: 'FakeDisk:\\FakeProjectDir\\config',
        dist: 'FakeDisk:\\FakeProjectDir\\dist',
        lib: 'FakeDisk:\\FakeProjectDir\\lib',
        root: 'FakeDisk:\\FakeProjectDir\\root',
        script: 'FakeDisk:\\FakeProjectDir\\script',
        src: 'FakeDisk:\\FakeProjectDir\\src',
      },
    });
  });
});
