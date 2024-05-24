import { AsserterBase } from "./internal/AsserterBase.js";
import { ObjectAsserter } from "./ObjectAsserter.js";
export class ArrayAsserter extends AsserterBase {
    assertMap;
    isArray;
    keySet;
    readMap;
    get array() { return this.isArray ? this.keyValue : []; }
    constructor(parent, key, keyValue, optional) {
        super(parent, key, keyValue, optional);
        this.assertMap = new Map();
        this.isArray = Array.isArray(this.keyValue);
        this.keySet = new Set();
        this.readMap = new Map();
        this.array.forEach((_, index) => this.keySet.add(`${this.keyPath}.${index}`));
    }
    of(type) {
        if (!this.keyPresent || !this.isArray) {
            return this._assert(false);
        }
        const tester = typeof (type) === "string" ? (value) => typeof (value) === type : type;
        const typeMatches = this.array.map(tester);
        const hasFalse = typeMatches.includes(false);
        return this._assert(this.keyPresent ? !hasFalse : false);
    }
    iterate(iterator) {
        if (!this.keyPresent || !this.isArray) {
            return this._assert(false);
        }
        const optional = false;
        const _this = this;
        this.array.forEach((value, index, array) => {
            const objectAsserter = new ObjectAsserter(_this, String(index), value, optional);
            iterator.call(_this, objectAsserter, index, array);
        });
        this._assert(true);
        return this.parent;
    }
}
