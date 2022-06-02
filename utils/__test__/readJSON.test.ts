import fs from 'fs';
import readJSON from '../readJSON';

describe('readJSON', () => {
  it('reads and parses JSON file', () => {
    jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => '{"key1": "value1", "key2": "value2"}');

    expect(readJSON('Path\\To\\File')).toStrictEqual({ key1: 'value1', key2: 'value2' });
  });
});
