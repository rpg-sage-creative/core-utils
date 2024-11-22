import { type Collection } from "./Collection.js";
/** Remove the value at the given index using .splice(). */
export declare function removeAt<T>(array: Array<T>, index: number): T | undefined;
/** Remove the value at the given index using .splice(). */
export declare function removeAt<T>(collection: Collection<T>, index: number): T | undefined;
/** Remove the values at the given indexes using .splice(). */
export declare function removeAt<T>(array: Array<T>, indexes: number[]): Array<T | undefined>;
/** Remove the values at the given indexes using .splice(). */
export declare function removeAt<T>(collection: Collection<T>, indexes: number[]): Collection<T | undefined>;
