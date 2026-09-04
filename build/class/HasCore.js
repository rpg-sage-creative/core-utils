import { HasCache } from "@rsc-utils/cache-utils";
/** Abstract Class with properties and methods related to the Core or objectType */
export class HasCore extends HasCache {
    core;
    /** Must have a core. */
    constructor(core) {
        super();
        this.core = core;
    }
    [Symbol.toStringTag]() {
        return this.core.objectType;
    }
    /** The type of data that is represented. Often the Class that the Core is for. */
    get objectType() {
        return this.core.objectType;
    }
    /** Returns true if the given object is this object or this object's core. */
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
    // /** Returns true if the this object's objectType matches the given value (if given a string) or its objectType (if given a HasCore). */
    // public isType(value: TypedCore | HasCore<TypedCore, ObjectType> | string): boolean {
    // 	if (typeof(value) === "string") {
    // 		return this.objectType === value;
    // 	}
    // 	return this.objectType === value.objectType;
    // }
    /** Returns this object's core. */
    toJSON() {
        return this.core;
    }
    static toJSON(objectOrCore) {
        return objectOrCore?.toJSON?.() ?? objectOrCore;
    }
}
