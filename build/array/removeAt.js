import { sortPrimitive } from "./sort/sortPrimitive.js";
export function removeAt(values, indexOrIndexes) {
    if (Array.isArray(indexOrIndexes)) {
        // get all the values to be removed
        const removed = indexOrIndexes.map(index => values[index]);
        // sort indexes in reverse order for safer splicing
        const sorted = indexOrIndexes.slice().sort(sortPrimitive).reverse();
        // splice each index to remove from target array
        sorted.forEach(index => values.splice(index, 1));
        // create an array from the one given to return the same type
        const arrayConstructor = values.constructor;
        const indexes = new arrayConstructor();
        // push the values removed into the typed array
        removed.forEach(item => indexes.push(item));
        return indexes;
    }
    // splice and return the single given index
    return values.splice(indexOrIndexes, 1)[0];
}
