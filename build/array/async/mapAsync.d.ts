import type { Awaitable } from "../../types/generics.js";
/**
 * Uses asynchronous logic to map an array in order.
 * Exceptions in the callback will be sent to console.warn and the valued at that index will be undefined.
 */
export declare function mapAsync<T, U>(array: U[], callbackfn: (value: U, index: number, array: U[]) => Awaitable<T>, thisArg?: any): Promise<T[]>;
/**
 * Uses asynchronous logic to map an array in order.
 * Exceptions in the callback will be sent to console.warn and the valued at that index will be undefined.
 */
export declare function mapAsync<T extends Array<U>, U, V extends Array<W>, W>(array: V, callbackfn: (value: W, index: number, array: V) => Awaitable<U>, thisArg?: any): Promise<V>;
