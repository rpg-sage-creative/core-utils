import { isDefined } from "@rsc-utils/type-utils";
import { removeAt } from "./removeAt.js";
/** Removes the values that return a truthy value, returning values that are defined (!null && !undefined). */
export function remove(array, predicate, thisArg) {
    // test each value against the predicate and store the index of those that are truthy
    const indexes = [];
    array.forEach((value, index, obj) => {
        if (predicate.call(thisArg, value, index, obj)) {
            indexes.push(index);
        }
    });
    // removeAt safely removes values by index
    return removeAt(array, indexes)
        // we only care about values that are defined
        .filter(isDefined);
}
