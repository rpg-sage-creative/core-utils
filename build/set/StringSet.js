import { wrapSetIterator } from "../iterator/wrapSetIterator.js";
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
        this._values[value.toLowerCase()] ??= value;
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
    difference(other) {
        const difference = new StringSet();
        const otherSet = other instanceof StringSet ? other : new StringSet(other);
        if (this.size > otherSet.size) {
            for (const [key, value] of otherSet.entries()) {
                if (!this.hasKey(key)) {
                    difference.add(value);
                }
            }
        }
        else {
            for (const [key, value] of this.entries()) {
                if (!otherSet.hasKey(key)) {
                    difference.add(value);
                }
            }
        }
        return difference;
    }
    entries() {
        return wrapSetIterator(Object.keys(this._values), key => {
            return {
                value: [key, this._values[key]],
                skip: false
            };
        });
    }
    forEach(fn, thisArg) {
        for (const [key, value] of this.entries()) {
            fn.call(thisArg, value, key, this);
        }
    }
    has(value) {
        return value.toLowerCase() in this._values;
    }
    hasKey(key) {
        return key in this._values;
    }
    intersection(other) {
        const intersection = new StringSet();
        const otherSet = other instanceof StringSet ? other : new StringSet(other);
        if (this.size > otherSet.size) {
            for (const [key, value] of otherSet.entries()) {
                if (this.hasKey(key)) {
                    intersection.add(value);
                }
            }
        }
        else {
            for (const [key, value] of this.entries()) {
                if (otherSet.hasKey(key)) {
                    intersection.add(value);
                }
            }
        }
        return intersection;
    }
    isDisjointFrom(other) {
        if (this.size > other.size) {
            for (const value of other) {
                if (this.has(value)) {
                    return false;
                }
            }
        }
        else {
            const otherSet = other instanceof StringSet ? other : new StringSet(other);
            for (const key of this.keys()) {
                if (otherSet.hasKey(key)) {
                    return false;
                }
            }
        }
        return true;
    }
    isSubsetOf(other) {
        if (this.size > other.size) {
            return false;
        }
        const otherSet = other instanceof StringSet ? other : new StringSet(other);
        for (const key of this.keys()) {
            if (!otherSet.hasKey(key)) {
                return false;
            }
        }
        return true;
    }
    isSupersetOf(other) {
        if (this.size < other.size) {
            return false;
        }
        const otherSet = other instanceof StringSet ? other : new StringSet(other);
        for (const key of otherSet.keys()) {
            if (!this.hasKey(key)) {
                return false;
            }
        }
        return true;
    }
    keys() {
        return wrapSetIterator(Object.keys(this._values), key => {
            return {
                value: key,
                skip: false
            };
        });
    }
    get size() {
        return Object.keys(this._values).length;
    }
    symmetricDifference(other) {
        const symmetricDifference = new StringSet();
        const otherSet = other instanceof StringSet ? other : new StringSet(other);
        for (const [key, value] of this.entries()) {
            if (!otherSet.has(key)) {
                symmetricDifference.add(value);
            }
        }
        for (const [key, value] of otherSet.entries()) {
            if (!this.has(key)) {
                symmetricDifference.add(value);
            }
        }
        return symmetricDifference;
    }
    union(other) {
        const union = new StringSet(this);
        for (const value of other) {
            union.add(value);
        }
        return union;
    }
    values() {
        return wrapSetIterator(Object.keys(this._values), key => {
            return {
                value: this._values[key],
                skip: false
            };
        });
    }
    static from(setLike) {
        return new StringSet(setLike);
    }
}
