import { isDate } from "node:util/types";
/**
 * Sorts values in ascending order.
 * undefined is considered the "greatest" value.
 * null is considered the "second greatest" value.
 * string vs string comparison is first done ignoring case.
 */
export function sortPrimitive(a, b) {
    // identical items should always return 0
    if (a === b)
        return 0;
    // undefined is the "greatest" value
    if (a === undefined) {
        return 1;
    }
    else if (b === undefined) {
        return -1;
    }
    // null is the "second greatest" value
    if (a === null) {
        return 1;
    }
    else if (b === null) {
        return -1;
    }
    // get lowercase values from strings for good/reliable alpha sorting
    const aLower = a?.toLowerCase?.() ?? a;
    const bLower = b?.toLowerCase?.() ?? b;
    // return less than / greater than results
    if (aLower < bLower) {
        return -1;
    }
    else if (aLower > bLower) {
        return 1;
    }
    // check data types
    if (a !== b) {
        const aType = isDate(a) ? "date" : typeof (a);
        const bType = isDate(b) ? "date" : typeof (b);
        // dates are objects and equal dates still fail ===
        const aDate = aType === "date";
        const bDate = bType === "date";
        if (aDate || bDate) {
            const asDate = sortPrimitive(aDate ? +a : a, bDate ? +b : b);
            if (asDate !== 0) {
                return asDate;
            }
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
