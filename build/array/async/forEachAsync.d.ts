import type { Awaitable } from "@rsc-utils/type-utils";
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
/**
 * Uses asynchronous logic to iterate over an array and log the progress.
 * Exceptions in the callback will be sent to console.warn.
 * Uses default ProgressLogger interval.
 */
export declare function forEachAsync<T>(label: string, array: T[], callbackfn: (value: T, index: number, array: T[]) => Awaitable<void>, thisArg?: any): Promise<void>;
/**
 * Uses asynchronous logic to iterate over an array and log the progress.
 * Exceptions in the callback will be sent to console.warn.
 */
export declare function forEachAsync<T>(label: string, array: T[], callbackfn: (value: T, index: number, array: T[]) => Awaitable<void>, interval?: number, thisArg?: any): Promise<void>;
/**
 * Uses asynchronous logic to iterate over an array and log the progress.
 * Exceptions in the callback will be sent to console.warn.
 * Uses default ProgressLogger interval.
 */
export declare function forEachAsync<T extends Array<U>, U>(label: string, array: T, callbackfn: (value: U, index: number, array: T) => Awaitable<void>, thisArg?: any): Promise<void>;
/**
 * Uses asynchronous logic to iterate over an array and log the progress.
 * Exceptions in the callback will be sent to console.warn.
 */
export declare function forEachAsync<T extends Array<U>, U>(label: string, array: T, callbackfn: (value: U, index: number, array: T) => Awaitable<void>, interval?: number, thisArg?: any): Promise<void>;
