import { EphemeralBase } from "./EphemeralBase.js";
export class EphemeralSet extends EphemeralBase {
    [Symbol.iterator]() {
        return this.values();
    }
    get [Symbol.toStringTag]() {
        return "EphemeralSet";
    }
    add(value) {
        return this.set(value, value);
    }
    forEach(fn, thisArg) {
        for (const entry of this.entries()) {
            fn.call(thisArg, entry[1], entry[0], this);
        }
    }
}
