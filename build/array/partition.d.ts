/** Partitions the values into nested Collections based on the partitionfn */
export declare function partition<T, U extends T[], V extends T[][]>(arrayLike: U, partitionfn: (value: T, index: number, arrayLike: U) => number, thisArg?: any): V;
