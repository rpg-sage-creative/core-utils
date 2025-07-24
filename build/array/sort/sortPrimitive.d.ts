import type { Optional } from "../../types/generics.js";
import type { SortResult } from "./types.js";
/**
 * Sorts values in ascending order.
 * undefined is considered the "greatest" value.
 * null is considered the "second greatest" value.
 * string vs string comparison is first done ignoring case.
 */
export declare function sortPrimitive<T extends boolean | Date | number | string>(a: Optional<T>, b: Optional<T>): SortResult;
