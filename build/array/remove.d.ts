import type { Collection } from "./Collection.js";
/** Removes the values that return a truthy value, returning values that are defined (!null && !undefined). */
export declare function remove<T>(array: Array<T>, predicate: (value: T, index: number, obj: Array<T>) => unknown, thisArg?: any): Array<T>;
/** Removes the values that return a truthy value, returning values that are defined (!null && !undefined). */
export declare function remove<T>(collection: Collection<T>, predicate: (value: T, index: number, obj: Collection<T>) => unknown, thisArg?: any): Collection<T>;
