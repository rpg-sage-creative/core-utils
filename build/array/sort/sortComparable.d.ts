import { type Comparable } from "./Comparable.js";
import { type SortResult } from "./SortResult.js";
/** Used to sort Comparable objects. */
export declare function sortComparable<T>(a: Comparable<T>, b: Comparable<T>): SortResult;
