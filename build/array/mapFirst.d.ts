import type { OrUndefined } from "../types/generics.js";
import type Collection from "./Collection.js";
/**
 * Iterates the given array and returns the first mapped value returned from callbackfn that isDefined() returns true for.
 * Essentially a convenience method for array.map(callbackfn).find(isDefined) that uses a single iteration/loop.
 */
export declare function mapFirst<T, U>(array: Array<T>, callbackfn: (value: T, index: number, array: Array<T>) => U, thisArg?: any): OrUndefined<U>;
/**
 * Iterates the given collection and returns the first mapped value returned from callbackfn that isDefined() returns true for.
 * Essentially a convenience method for collection.map(callbackfn).find(isDefined) that uses a single iteration/loop.
 */
export declare function mapFirst<T, U>(collection: Collection<T>, callbackfn: (value: T, index: number, collection: Collection<T>) => U, thisArg?: any): OrUndefined<U>;
