import type { Awaitable } from "@rsc-utils/type-utils";
/**
 * Uses asynchronous logic to filter an array.
 * Exceptions in the predicate will be sent to core-utils::warn and considered "falsey".
 */
export declare function filterAsync<T>(array: T[], predicate: (value: T, index: number, array: T[]) => Awaitable<unknown>, thisArg?: any): Promise<T[]>;
/**
 * Uses asynchronous logic to filter an array.
 * Exceptions in the predicate will be sent to core-utils::warn and considered "falsey".
 */
export declare function filterAsync<T extends Array<U>, U>(array: T, predicate: (value: U, index: number, array: T) => Awaitable<unknown>, thisArg?: any): Promise<T>;
