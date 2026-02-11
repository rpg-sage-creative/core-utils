import { type OrUndefined } from "@rsc-utils/type-utils";
/**
 * Iterates the given array and returns the first mapped value returned from callbackfn that isDefined() returns true for.
 * Essentially a convenience method for array.map(callbackfn).find(isDefined) that uses a single iteration/loop.
 */
export declare function mapFirst<T, U, V extends T[] = T[]>(arrayLike: T[], callbackfn: (value: T, index: number, values: V) => U, thisArg?: any): OrUndefined<U>;
