import { wrapIterableIterator } from "../iterator/wrapIterableIterator.js";
export class StringSet {
    _values = {};
    constructor(values) {
        if (values) {
            for (const value of values) {
                this.add(value);
            }
        }
    }
    [Symbol.iterator]() {
        return this.values();
    }
    get [Symbol.toStringTag]() {
        return "StringSet";
    }
    add(value) {
        if (typeof (value) !== "string") {
            throw new TypeError("string expected");
        }
        this._values[value.toLowerCase()] = value;
        return this;
    }
    clear() {
        this._values = {};
    }
    delete(value) {
        const { _values } = this;
        const lower = value.toLowerCase();
        if (lower in _values) {
            delete _values[lower];
            return true;
        }
        return false;
    }
    entries() {
        return wrapIterableIterator(Object.keys(this._values), key => {
            return {
                value: [key, this._values[key]],
                skip: false
            };
        });
    }
    forEach(fn, thisArg) {
        for (const entry of this.entries()) {
            fn.call(thisArg, entry[1], entry[0], this);
        }
    }
    has(key) {
        return key.toLowerCase() in this._values;
    }
    keys() {
        return wrapIterableIterator(Object.keys(this._values), key => {
            return {
                value: key,
                skip: false
            };
        });
    }
    get size() {
        return Object.keys(this._values).length;
    }
    values() {
        return wrapIterableIterator(Object.keys(this._values), key => {
            return {
                value: this._values[key],
                skip: false
            };
        });
    }
}
