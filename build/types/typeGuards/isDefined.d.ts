import type { Optional } from "../generics.js";
/** Returns true if given value is not NULL and not UNDEFINED. */
export declare function isDefined<T>(value: Optional<T> | void): value is T;
