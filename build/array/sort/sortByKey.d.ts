import type { Sorter } from "./Sorter.js";
/** Creates a sorter that will sort objects by the values of the given keys. */
export declare function sortByKey<T>(...keys: (keyof T)[]): Sorter<T>;
