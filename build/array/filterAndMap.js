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
