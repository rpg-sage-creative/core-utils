/**
 * Filters and maps an array using a single pass through the array.
 * Only values that return "truthy" to the predicate will be sent to the callbackfn.
 */
export function filterAndMap(arrayLike, predicate, callbackfn, thisArg) {
    let newIndex = 0;
    const arrayConstructor = arrayLike.constructor;
    const mapped = new arrayConstructor();
    arrayLike.forEach((value, index, array) => {
        if (predicate.call(thisArg, value, index, array)) {
            mapped.push(callbackfn.call(thisArg, value, newIndex));
            newIndex++;
        }
    });
    return mapped;
}
