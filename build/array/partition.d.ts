/** Partitions the values into nested Collections based on the partitionfn */
export declare function partition<T, U extends T[] = T[], V extends T[][] = T[][]>(arrayLike: T[], partitionfn: (value: T, index: number, arrayLike: U) => number, thisArg?: any): V;
