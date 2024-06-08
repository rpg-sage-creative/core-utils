import { isNilUuid } from "./isNilUuid.js";
import { isNonNilUuid } from "./isNonNillUuid.js";
import { isUuid } from "./isUuid.js";
import { orNilUuid } from "./orNilUuid.js";
export class UuidMatcher {
    constructor(value) {
        this.value = value;
    }
    _isNonNil;
    get isNonNil() {
        return this._isNonNil ?? (this._isNonNil = isNonNilUuid(this.value));
    }
    _isValid;
    get isValid() {
        return this._isValid ?? (this._isValid = isUuid(this.value));
    }
    _matchValue;
    get matchValue() {
        return this._matchValue ?? (this._matchValue = orNilUuid(this.value));
    }
    value;
    matches(other) {
        if (!this.isValid || other === null || other === undefined) {
            return false;
        }
        if (typeof (other) === "string") {
            if (this.isNonNil) {
                return this.matchValue === orNilUuid(other);
            }
            return isNilUuid(other);
        }
        if (!other.isValid || this.isNonNil !== other.isNonNil) {
            return false;
        }
        return this.matchValue === other.matchValue;
    }
    matchesAny(...args) {
        return args.flat(1).some(value => this.matches(value));
    }
    toString() {
        return this.value;
    }
    static from(value) {
        return new UuidMatcher((typeof (value) === "string" ? value : value?.value));
    }
}
