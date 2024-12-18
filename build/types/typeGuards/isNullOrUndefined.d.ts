import type { Optional } from "../generics.js";
/** Returns true if the object is NULL or UNDEFINED. */
export declare function isNullOrUndefined<T>(value: Optional<T> | void): value is null | undefined;
