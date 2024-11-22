import {} from "./SortResult.js";
import {} from "./Sorter.js";
import { sortPrimitive } from "./sortPrimitive.js";
export function sortByKey(...keys) {
    return (a, b) => {
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
        const caseSortResults = [];
        for (const key of keys) {
            const aValue = a?.[key];
            const bValue = b?.[key];
            const sortResult = sortPrimitive(aValue, bValue);
            const aLower = aValue?.toLowerCase?.() ?? aValue;
            const bLower = bValue?.toLowerCase?.() ?? bValue;
            if (aLower === bLower) {
                caseSortResults.push(sortResult);
            }
            else if (sortResult !== 0) {
                return sortResult;
            }
        }
        for (const sortResult of caseSortResults) {
            if (sortResult !== 0) {
                return sortResult;
            }
        }
        return 0;
    };
}
