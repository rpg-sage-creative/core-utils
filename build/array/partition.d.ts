import { type Collection } from "./Collection.js";
/** Partitions the values into nested Collections based on the partitionfn */
export declare function partition<T>(array: T[], partitionfn: (value: T, index: number, array: T[]) => number, thisArg?: any): T[][];
/** Partitions the values into nested Collections based on the partitionfn */
export declare function partition<T>(collection: Collection<T>, partitionfn: (value: T, index: number, arrayLike: Collection<T>) => number, thisArg?: any): Collection<Collection<T>>;
