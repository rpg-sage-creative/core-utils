import { isDefined } from "@rsc-utils/type-utils";
/**
 * Iterates the given array and returns the first mapped value returned from callbackfn that isDefined() returns true for.
 * Essentially a convenience method for array.map(callbackfn).find(isDefined) that uses a single iteration/loop.
 */
export function mapFirst(arrayLike, callbackfn, thisArg) {
    for (let index = 0; index < arrayLike.length; index++) {
        const result = callbackfn.call(thisArg, arrayLike[index], index, arrayLike);
        if (isDefined(result)) {
            return result;
        }
    }
    return undefined;
}
