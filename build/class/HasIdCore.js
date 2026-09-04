import { getIdMatcher } from "@rsc-utils/id-utils";
import { HasCore } from "./HasCore.js";
//#endregion
/** Abstract Class with properties and methods related to the id. */
export class HasIdCore extends HasCore {
    /** The unique identifier for this object. */
    get id() { return this.core.id; }
    /** Used to cache the SnowflakeMatcher or UuidMatcher used for .equals(). */
    _idMatcher;
    /** Used to cache the SnowflakeMatcher or UuidMatcher used for .equals(). */
    get idMatcher() {
        return this._idMatcher ?? (this._idMatcher = getIdMatcher(this.core.id));
    }
    /** @deprecated Used to cache the SnowflakeMatcher used for .equals(). */
    _didMatcher;
    /** @deprecated Used to cache the SnowflakeMatcher used for .equals(). */
    get didMatcher() {
        return this._didMatcher ?? (this._didMatcher = getIdMatcher(this.core.did));
    }
    /** @deprecated Used to cache the UuidMatcher used for .equals(). */
    _uuidMatcher;
    /** @deprecated Used to cache the UuidMatcher used for .equals(). */
    get uuidMatcher() {
        return this._uuidMatcher ?? (this._uuidMatcher = getIdMatcher(this.core.uuid));
    }
    /** Returns true if the given object represents this object, it's core, or it's id. */
    equals(other) {
        if (!other) {
            return false;
        }
        if (other instanceof HasIdCore) {
            //#region @deprecated return logic
            if (this.is(other))
                return true;
            if (this.idMatcher.matchesAny(other.idMatcher, other.didMatcher, other.uuidMatcher))
                return true;
            if (this.didMatcher.matchesAny(other.idMatcher, other.didMatcher))
                return true;
            if (this.uuidMatcher.matchesAny(other.idMatcher, other.uuidMatcher))
                return true;
            return false;
            //#endregion
            //#region wanted return logic
            // return this.is(other as HasIdCore<any, any>)
            // 	|| this.idMatcher.matches(other.idMatcher);
            //#endregion
        }
        //#region @deprecated return logic
        if (typeof (other) === "string") {
            return getIdMatcher(other).matchesAny(this.idMatcher, this.didMatcher, this.uuidMatcher);
        }
        return other.matchesAny(this.idMatcher, this.didMatcher, this.uuidMatcher);
        //#endregion
        //#region wanted return logic
        // return this.idMatcher.matches(other);
        //#endregion
    }
}
