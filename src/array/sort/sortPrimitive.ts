import { isDate } from "util/types";
import type { Optional } from "../../types/generics.js";
import type { SortResult } from "./SortResult.js";

/**
 * Sorts values in ascending order.
 * undefined is considered the "greatest" value.
 * null is considered the "second greatest" value.
 * string vs string comparison is first done ignoring case.
 */
export function sortPrimitive<T extends boolean | Date | number | string>(a: Optional<T>, b: Optional<T>): SortResult {
	// undefined is the "greatest" value
	if (a === undefined) {
		return 1;
	}else if (b === undefined) {
		return -1;
	}

	// null is the "second greatest" value
	if (a === null) {
		return 1;
	}else if (b === null) {
		return -1;
	}

	// get lowercase values from strings for good/reliable alpha sorting
	const aLower = (a as string)?.toLowerCase?.() ?? a;
	const bLower = (b as string)?.toLowerCase?.() ?? b;

	// return less than / greater than results
	if (aLower < bLower) {
		return -1;
	}else if (aLower > bLower) {
		return 1;
	}

	// check data types
	if (a !== b) {
		const aType = isDate(a) ? "date" : typeof(a);
		const bType = isDate(b) ? "date" : typeof(b);

		// dates are objects and equal dates still fail ===
		const aDate = aType === "date";
		const bDate = bType === "date";
		if (aDate || bDate) {
			return sortPrimitive(aDate ? +a as T : a, bDate ? +b as T : b);
		}

		// strings that differ only by case
		if (aType === "string" && bType === "string") {
			return a < b ? -1 : 1;
		}

		// "2" !== 2; sorting by type makes results consistent
		return aType < bType ? -1 : 1;
	}

	return 0;
}