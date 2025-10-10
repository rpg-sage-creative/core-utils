import { HasCache } from "../cache/HasCache.js";
export class HasCore extends HasCache {
    core;
    constructor(core) {
        super();
        this.core = core;
    }
    [Symbol.toStringTag]() {
        return this.core.objectType;
    }
    get objectType() {
        return this.core.objectType;
    }
    is(value) {
        if (value && this.core) {
            if (value === this || value === this.core) {
                return true;
            }
            if ("core" in value && this.core === value.core) {
                return true;
            }
        }
        return false;
    }
    toJSON() {
        return this.core;
    }
    static toJSON(objectOrCore) {
        return objectOrCore?.toJSON?.() ?? objectOrCore;
    }
}
