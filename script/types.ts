export type SearchReplaceValuePair = {
  searchValue: RegExp;
  replaceValue: string;
};

export type PackageJSON = {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: Record<string, string>;
  repository: {
    type: string;
    url: string;
  };
  author: string;
  license: string;
  bugs: {
    url: string;
  };
  homepage: string;
  dependencies: Record<string, string> | undefined;
  devDependencies: Record<string, string> | undefined;
};
