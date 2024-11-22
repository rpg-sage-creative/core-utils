import { isDate } from "util/types";
import {} from "./SortResult.js";
export function sortPrimitive(a, b) {
    if (a === undefined) {
        return 1;
    }
    else if (b === undefined) {
        return -1;
    }
    if (a === null) {
        return 1;
    }
    else if (b === null) {
        return -1;
    }
    const aLower = a?.toLowerCase?.() ?? a;
    const bLower = b?.toLowerCase?.() ?? b;
    if (aLower < bLower) {
        return -1;
    }
    else if (aLower > bLower) {
        return 1;
    }
    if (a !== b) {
        const aType = isDate(a) ? "date" : typeof (a);
        const bType = isDate(b) ? "date" : typeof (b);
        const aDate = aType === "date";
        const bDate = bType === "date";
        if (aDate || bDate) {
            return sortPrimitive(aDate ? +a : a, bDate ? +b : b);
        }
        if (aType === "string" && bType === "string") {
            return a < b ? -1 : 1;
        }
        return aType < bType ? -1 : 1;
    }
    return 0;
}
