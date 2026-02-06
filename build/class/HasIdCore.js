import { HasCore } from "./HasCore.js";
import { getIdMatcher } from "../id-utils/getIdMatcher.js";
export class HasIdCore extends HasCore {
    get id() { return this.core.id; }
    _idMatcher;
    get idMatcher() {
        return this._idMatcher ?? (this._idMatcher = getIdMatcher(this.core.id));
    }
    _didMatcher;
    get didMatcher() {
        return this._didMatcher ?? (this._didMatcher = getIdMatcher(this.core.did));
    }
    _uuidMatcher;
    get uuidMatcher() {
        return this._uuidMatcher ?? (this._uuidMatcher = getIdMatcher(this.core.uuid));
    }
    equals(other) {
        if (!other) {
            return false;
        }
        if (other instanceof HasIdCore) {
            if (this.is(other))
                return true;
            if (this.idMatcher.matchesAny(other.idMatcher, other.didMatcher, other.uuidMatcher))
                return true;
            if (this.didMatcher.matchesAny(other.idMatcher, other.didMatcher))
                return true;
            if (this.uuidMatcher.matchesAny(other.idMatcher, other.uuidMatcher))
                return true;
            return false;
        }
        if (typeof (other) === "string") {
            return getIdMatcher(other).matchesAny(this.idMatcher, this.didMatcher, this.uuidMatcher);
        }
        return other.matchesAny(this.idMatcher, this.didMatcher, this.uuidMatcher);
    }
}
