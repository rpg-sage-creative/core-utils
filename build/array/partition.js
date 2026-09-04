/** Partitions the values into nested Collections based on the partitionfn */
export function partition(arrayLike, partitionfn, thisArg) {
    // create typed array for output
    const arrayConstructor = arrayLike.constructor;
    const partitioned = new arrayConstructor();
    arrayLike.forEach((value, index, array) => {
        const partIndex = partitionfn.call(thisArg, value, index, array);
        if (!partitioned[partIndex]) {
            partitioned[partIndex] = new arrayConstructor();
        }
        partitioned[partIndex].push(value);
    });
    return partitioned;
}
