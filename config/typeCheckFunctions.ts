export default (val: unknown): val is string => typeof val === 'string';
