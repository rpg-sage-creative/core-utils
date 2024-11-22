import { type Collection } from "./Collection.js";
/** Returns a new array that doesn't contain the passed args */
export declare function without<T>(array: Array<T>, ...args: T[]): Array<T>;
/** Returns a new array that doesn't contain the passed args */
export declare function without<T>(collection: Collection<T>, ...args: T[]): Collection<T>;
