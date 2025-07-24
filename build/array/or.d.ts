import type { Filter } from "./filter/Filter.js";
import type { Sorter } from "./sort/types.js";
/**
 * Creates a single Filter function that tests each array element against the given filters.
 * If any given filter returns true, the returned filter returns true.
 * Ex: .filter(or(isDefined, toUnique)) -> .filter((v, i, a) => isDefined(v, i, a) || toUnique(v, i, a))
 */
export declare function or<T>(...filters: Filter<T>[]): Filter<T>;
/**
 * Creates a single Sorter function that tests each pair of values against the given sorters.
 * The sorters are tested in order such that the first result of -1 or 1 is returned.
 * Ex: .sort(or(sortByLevel, sortByName)) -> .sort((a, b) => sortByLevel(a, b) || sortByName(a, b))
 */
export declare function or<T>(...sorters: Sorter<T>[]): Sorter<T>;
