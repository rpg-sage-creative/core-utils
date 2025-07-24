import type { Sorter } from "./types.js";
/** Creates a sorter that sorts values in ascending order as Date objects using new Date() to convert them. */
export declare function sortAsPrimitive<T>(dataType: "date"): Sorter<T>;
/** Creates a sorter that sorts values in ascending order as numbers using Number() to convert them. */
export declare function sortAsPrimitive<T>(dataType: "number"): Sorter<T>;
/** Creates a sorter that sorts values in ascending order as strings using String() to convert them. */
export declare function sortAsPrimitive<T>(dataType: "string"): Sorter<T>;
/** Creates a sorter that sorts values in ascending order as strings (case insensitive) using String() to convert them. */
export declare function sortAsPrimitive<T>(dataType: "string", ignoreCase: true): Sorter<T>;
