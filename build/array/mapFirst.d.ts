import type { OrUndefined } from "../types/generics.js";
/**
 * Iterates the given array and returns the first mapped value returned from callbackfn that isDefined() returns true for.
 * Essentially a convenience method for array.map(callbackfn).find(isDefined) that uses a single iteration/loop.
 */
export declare function mapFirst<T, U, V extends T[]>(arrayLike: V, callbackfn: (value: T, index: number, values: V) => U, thisArg?: any): OrUndefined<U>;
