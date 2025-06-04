import type { OrUndefined } from "../types/generics.js";
/** Remove the value at the given index using .splice(). */
export declare function removeAt<T, U extends T[] = T[]>(array: U, index: number): OrUndefined<T>;
/** Remove the values at the given indexes using .splice(). */
export declare function removeAt<T, U extends T[] = T[], V extends OrUndefined<T>[] = OrUndefined<T>[]>(array: U, indexes: number[]): OrUndefined<T>[];
