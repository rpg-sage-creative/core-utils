import type { Sorter } from "./types.js";
/** Creates a sorter that will sort objects by the values of the given keys. */
export declare function sortByKey<T>(...keys: (keyof T)[]): Sorter<T>;
