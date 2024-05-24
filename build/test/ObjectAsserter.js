import { ArrayAsserter } from "./ArrayAsserter.js";
import { AsserterBase } from "./internal/AsserterBase.js";
import { ValueAsserter } from "./ValueAsserter.js";
export class ObjectAsserter extends AsserterBase {
    assertMap;
    keySet;
    readMap;
    constructor(parent, key, keyValue, optional) {
        super(parent, key, keyValue, optional);
        this.assertMap = new Map();
        this.keySet = new Set();
        this.readMap = new Map();
    }
    array(key, optional) {
        key = String(key);
        this.readMap.set(key, true);
        return new ArrayAsserter(this, key, this.keyValue?.[key], !!optional);
    }
    object(key, optional) {
        key = String(key);
        this.readMap.set(key, true);
        return new ObjectAsserter(this, key, this.keyValue?.[key], !!optional);
    }
    assert(handler) {
        this.parent.assertMap.set(this.key, true);
        handler(this);
        return this.parent;
    }
    value(key, optional) {
        key = String(key);
        this.readMap.set(key, true);
        return new ValueAsserter(this, key, this.keyValue?.[key], !!optional);
    }
    setKeys(...args) {
        const keys = args.flat().map(String).sort();
        keys.forEach(key => {
            this.keySet.add(key);
            if (!this.readMap.has(key))
                this.readMap.set(key, false);
            if (!this.assertMap.has(key))
                this.assertMap.set(key, false);
        });
        return this;
    }
    todo() {
        const allKeySet = Array.from(new Set(Array.from(this.keySet).concat(Object.keys(this.keyValue ?? {})))).sort();
        allKeySet.forEach(key => {
            const valid = this.keySet.has(key);
            const read = this.readMap.get(key);
            const assert = this.assertMap.get(key);
            const todoOut = valid ? [read ? "" : "READ", assert ? "" : "ASSERT"].filter(s => s).join("/") : "INVALID";
            console.assert(read && assert, `${this.keyPath}.${key} @TODO ${todoOut}`);
        });
        return this;
    }
    boolean(key, optional = false) {
        return this.value(key, optional).boolean();
    }
    enum(key, enumObj, optional = false) {
        return this.value(key, optional).enum(enumObj);
    }
    number(key, optional = false) {
        return this.value(key, optional).number();
    }
    snowflake(key, optional = false) {
        return this.value(key, optional).snowflake();
    }
    string(key, optional = false) {
        return this.value(key, optional).string();
    }
}
