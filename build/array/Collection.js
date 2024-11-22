import { isDefined } from "../types/typeGuards/isDefined.js";
import { toUnique } from "./filter/toUnique.js";
import { filterAndMap } from "./filterAndMap.js";
import { remove } from "./remove.js";
import { removeAt } from "./removeAt.js";
import { without } from "./without.js";
export class Collection extends Array {
    get isEmpty() {
        return this.length === 0;
    }
    findWithIndex(predicate, thisArg) {
        const index = this.findIndex(predicate, thisArg);
        return [index === -1 ? undefined : this[index], index];
    }
    empty() {
        this.length = 0;
    }
    existing() {
        return this.filter(isDefined);
    }
    filterAndMap(predicate, callbackfn, thisArg) {
        return filterAndMap(this, predicate, callbackfn, thisArg);
    }
    first() {
        return this[0];
    }
    last() {
        return this[this.length - 1];
    }
    pluck(key, onlyUnique) {
        const values = this.map(value => value[key]);
        if (onlyUnique) {
            return values.filter(toUnique);
        }
        return values;
    }
    remove(predicate, thisArg) {
        return remove(this, predicate, thisArg);
    }
    removeAt(indexOrIndexes) {
        return removeAt(this, indexOrIndexes);
    }
    without(...args) {
        return without(this, ...args);
    }
    static from(arrayLike, mapfn, thisArg) {
        const collection = new Collection();
        collection.push(...Array.from(arrayLike, mapfn, thisArg));
        return collection;
    }
}
export default Collection;
