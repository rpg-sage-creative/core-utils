import { type Collection } from "./Collection.js";
/**
 * Filters and maps an array using a single pass through the array.
 * Only values that return "truthy" to the predicate will be sent to the callbackfn.
 */
export declare function filterAndMap<T, U>(array: Array<T>, predicate: (value: T, index: number, array: Array<T>) => unknown, callbackfn: (value: T, newIndex: number) => U, thisArg?: any): Array<U>;
/**
 * Filters and maps an array using a single pass through the array.
 * Only values that return "truthy" to the predicate will be sent to the callbackfn.
 */
export declare function filterAndMap<T, U>(collection: Collection<T>, predicate: (value: T, index: number, collection: Collection<T>) => unknown, callbackfn: (value: T, newIndex: number) => U, thisArg?: any): Collection<U>;
