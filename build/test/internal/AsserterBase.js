import { stringify } from "../../json/index.js";
export class AsserterBase {
    parent;
    key;
    keyPath;
    keyPresent;
    keyValue;
    optional;
    constructor(parent, key, keyValue, optional) {
        this.parent = parent;
        this.key = key;
        this.keyPath = parent?.keyPath ? `${parent.keyPath}.${key}` : key;
        this.keyPresent = key && parent?.keyValue ? key in parent.keyValue : false;
        this.keyValue = keyValue;
        this.optional = optional;
    }
    _assert(testBool) {
        this.parent.assertMap.set(this.key, true);
        const assertBool = this.optional ? !this.keyPresent || testBool : testBool;
        const assertMessage = `${this.keyPath} :: ${stringify(this.keyValue)}`;
        console.assert(assertBool, assertMessage);
        return this.parent;
    }
}
