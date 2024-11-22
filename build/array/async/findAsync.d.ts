import type { Awaitable } from "../../types/generics.js";
/**
 * Uses asynchronous logic to perform a find on an array.
 * Exceptions in the predicate will be sent to console.warn and considered "falsey".
 */
export declare function findAsync<T>(array: T[], predicate: (value: T, index: number, array: T[]) => Awaitable<unknown>, thisArg?: any): Promise<T | undefined>;
/**
 * Uses asynchronous logic to filter an array.
 * Exceptions in the predicate will be sent to core-utils::warn and considered "falsey".
 */
export declare function findAsync<T extends Array<U>, U>(array: T, predicate: (value: U, index: number, array: T) => Awaitable<unknown>, thisArg?: any): Promise<U | undefined>;
