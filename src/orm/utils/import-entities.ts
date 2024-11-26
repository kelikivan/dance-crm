import { DataSourceOptions } from "typeorm";

export type EntitiesAndMigrationsOpts = Pick<
  DataSourceOptions,
  'entities' | 'migrations'
>;

export const importAllFunctions = (
  requireContext: __WebpackModuleApi.RequireContext,
) =>
  requireContext
    .keys()
    .sort()
    .map((filename) => {
      const required = requireContext(filename);
      return Object.keys(required).reduce((result, exportedKey) => {
        const exported = required[exportedKey];
        if (typeof exported === 'function') {
          return result.concat(exported);
        }
        return result;
      }, [] as any);
    })
    .flat();