import type { Awaitable } from "../../types/generics.js";
/**
 * Uses asynchronous logic to iterate over an array in order.
 * Exceptions in the callback will be sent to console.warn.
 */
export declare function forEachAsync<T>(array: T[], callbackfn: (value: T, index: number, array: T[]) => Awaitable<void>, thisArg?: any): Promise<void>;
/**
 * Uses asynchronous logic to iterate over an array in order.
 * Exceptions in the callback will be sent to console.warn.
 */
export declare function forEachAsync<T extends Array<U>, U>(array: T, callbackfn: (value: U, index: number, array: T) => Awaitable<void>, thisArg?: any): Promise<void>;
