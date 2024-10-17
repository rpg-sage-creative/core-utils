import { EphemeralBase } from "./EphemeralBase.js";
export class EphemeralMap extends EphemeralBase {
    [Symbol.iterator]() {
        return this.entries();
    }
    get [Symbol.toStringTag]() {
        return "EphemeralMap";
    }
    set(key, value) {
        return super.set(key, value);
    }
    forEach(fn, thisArg) {
        for (const entry of this.entries()) {
            fn.call(thisArg, entry[1], entry[0], this);
        }
    }
    get(key) {
        return this.map.get(key)?.value;
    }
}
