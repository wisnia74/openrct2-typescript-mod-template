// eslint-disable-next-line import/prefer-default-export
export const stringTypeCheckFunction = (val: unknown): val is string => typeof val === 'string';
