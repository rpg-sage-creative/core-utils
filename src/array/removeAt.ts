import type { OrUndefined } from "../types/generics.js";
import { sortPrimitive } from "./sort/sortPrimitive.js";

/** Remove the value at the given index using .splice(). */
export function removeAt<T, U extends T[] = T[]>(array: U, index: number): OrUndefined<T>;

/** Remove the values at the given indexes using .splice(). */
export function removeAt<T, U extends T[] = T[], V extends OrUndefined<T>[] = OrUndefined<T>[]>(array: U, indexes: number[]): OrUndefined<T>[];

export function removeAt<T, U extends T[], V extends OrUndefined<T>[]>(values: U, indexOrIndexes: number | number[]): T | undefined | V {
	if (Array.isArray(indexOrIndexes)) {
		// get all the values to be removed
		const removed = indexOrIndexes.map(index => values[index]);

		// sort indexes in reverse order for safer splicing
		const sorted = indexOrIndexes.slice().sort(sortPrimitive).reverse();

		// splice each index to remove from target array
		sorted.forEach(index => values.splice(index, 1));

		// create an array from the one given to return the same type
		const arrayConstructor = values.constructor as ArrayConstructor;
		const indexes = new arrayConstructor() as V;

		// push the values removed into the typed array
		indexes.push(...removed);

		return indexes;
	}

	// splice and return the single given index
	return values.splice(indexOrIndexes, 1)[0];
}