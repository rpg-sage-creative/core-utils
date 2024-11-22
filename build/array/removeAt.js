import {} from "./Collection.js";
import { sortPrimitive } from "./sort/sortPrimitive.js";
export function removeAt(values, indexOrIndexes) {
    if (Array.isArray(indexOrIndexes)) {
        const removed = indexOrIndexes.map(index => values[index]);
        const sorted = indexOrIndexes.slice().sort(sortPrimitive).reverse();
        sorted.forEach(index => values.splice(index, 1));
        const arrayConstructor = values.constructor;
        const indexes = new arrayConstructor();
        indexes.push(...removed);
        return indexes;
    }
    return values.splice(indexOrIndexes, 1)[0];
}
