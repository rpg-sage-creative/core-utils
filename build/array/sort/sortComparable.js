import {} from "./Comparable.js";
import {} from "./SortResult.js";
export function sortComparable(a, b) {
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
    return a.compareTo(b);
}
