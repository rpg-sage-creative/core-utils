/**
 * Filters and maps an array using a single pass through the array.
 * Only values that return "truthy" to the predicate will be sent to the callbackfn.
 */
export declare function filterAndMap<T, U, V extends T[] = T[], W extends U[] = U[]>(arrayLike: T[], predicate: (value: T, index: number, values: V) => unknown, callbackfn: (value: T, newIndex: number) => U, thisArg?: any): W;
