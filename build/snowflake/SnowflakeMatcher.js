import { isNilSnowflake } from "./isNilSnowflake.js";
import { isNonNilSnowflake } from "./isNonNilSnowflake.js";
import { isSnowflake } from "./isSnowflake.js";
import { orNilSnowflake } from "./orNilSnowflake.js";
export class SnowflakeMatcher {
    constructor(value) {
        this.value = value;
    }
    _isNonNil;
    get isNonNil() {
        return this._isNonNil ?? (this._isNonNil = isNonNilSnowflake(this.value));
    }
    _isValid;
    get isValid() {
        return this._isValid ?? (this._isValid = isSnowflake(this.value));
    }
    _matchValue;
    get matchValue() {
        return this._matchValue ?? (this._matchValue = orNilSnowflake(this.value));
    }
    value;
    matches(other) {
        if (!this.isValid || other === null || other === undefined) {
            return false;
        }
        if (typeof (other) === "string") {
            if (this.isNonNil) {
                return this.matchValue === orNilSnowflake(other);
            }
            return isNilSnowflake(other);
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
        return this.value ?? "";
    }
    static from(value) {
        return new SnowflakeMatcher(typeof (value) === "string" ? value : value?.value);
    }
}
