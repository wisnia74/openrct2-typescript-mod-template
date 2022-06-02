export default <T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => {
  const temp = obj;

  keys.forEach((key) => {
    delete temp[key];
  });

  return temp;
};
