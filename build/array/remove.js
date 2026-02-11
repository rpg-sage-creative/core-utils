import { isDefined } from "@rsc-utils/type-utils";
import { removeAt } from "./removeAt.js";
export function remove(array, predicate, thisArg) {
    const indexes = [];
    array.forEach((value, index, obj) => {
        if (predicate.call(thisArg, value, index, obj)) {
            indexes.push(index);
        }
    });
    return removeAt(array, indexes)
        .filter(isDefined);
}
