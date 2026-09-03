import type { Awaitable } from "@rsc-utils/type-utils";
/**
 * Uses asynchronous logic to map an array in order.
 * Exceptions in the callback will be sent to console.warn and the valued at that index will be undefined.
 */
export declare function mapAsync<OutValue, InValue>(array: InValue[], callbackfn: (value: InValue, index: number, array: InValue[]) => Awaitable<OutValue>, thisArg?: any): Promise<OutValue[]>;
/**
 * Uses asynchronous logic to map an array in order.
 * Exceptions in the callback will be sent to console.warn and the valued at that index will be undefined.
 */
export declare function mapAsync<OutArray extends Array<OutValue>, OutValue, InArray extends Array<InValue>, InValue>(array: InArray, callbackfn: (value: InValue, index: number, array: InArray) => Awaitable<OutValue>, thisArg?: any): Promise<OutArray>;
/**
 * Uses asynchronous logic to map an array and log the progress.
 * Exceptions in the callback will be sent to console.warn and the valued at that index will be undefined.
 */
export declare function mapAsync<OutValue, InValue>(label: string, array: InValue[], callbackfn: (value: InValue, index: number, array: InValue[]) => Awaitable<OutValue>, thisArg?: any): Promise<OutValue[]>;
/**
 * Uses asynchronous logic to map an array and log the progress.
 * Exceptions in the callback will be sent to console.warn and the valued at that index will be undefined.
 */
export declare function mapAsync<OutValue, InValue>(label: string, array: InValue[], callbackfn: (value: InValue, index: number, array: InValue[]) => Awaitable<OutValue>, interval?: number, thisArg?: any): Promise<OutValue[]>;
/**
 * Uses asynchronous logic to map an array and log the progress.
 * Exceptions in the callback will be sent to console.warn and the valued at that index will be undefined.
 */
export declare function mapAsync<OutArray extends Array<OutValue>, OutValue, InArray extends Array<InValue>, InValue>(label: string, array: InArray, callbackfn: (value: InValue, index: number, array: InArray) => Awaitable<OutValue>, thisArg?: any): Promise<OutArray>;
/**
 * Uses asynchronous logic to map an array and log the progress.
 * Exceptions in the callback will be sent to console.warn and the valued at that index will be undefined.
 */
export declare function mapAsync<OutArray extends Array<OutValue>, OutValue, InArray extends Array<InValue>, InValue>(label: string, array: InArray, callbackfn: (value: InValue, index: number, array: InArray) => Awaitable<OutValue>, interval?: number, thisArg?: any): Promise<OutArray>;
