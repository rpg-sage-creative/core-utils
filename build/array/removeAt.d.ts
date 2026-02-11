import type { OrUndefined } from "@rsc-utils/type-utils";
/** Remove the value at the given index using .splice(). */
export declare function removeAt<T>(array: T[], index: number): OrUndefined<T>;
/** Remove the values at the given indexes using .splice(). */
export declare function removeAt<T, U extends OrUndefined<T>[] = OrUndefined<T>[]>(array: T[], indexes: number[]): U[];
