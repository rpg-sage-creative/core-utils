/** Removes the values that return a truthy value, returning values that are defined (!null && !undefined). */
export declare function remove<T, U extends T[] = T[]>(array: T[], predicate: (value: T, index: number, obj: U) => unknown, thisArg?: any): U;
