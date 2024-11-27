import { isDefined } from "../types/index.js";
import { isBlank } from "./blank/isBlank.js";
import { isNotBlank } from "./blank/isNotBlank.js";
import { normalizeAscii } from "./normalize/normalizeAscii.js";
import { removeAccents } from "./normalize/removeAccents.js";
import { cleanWhitespace } from "./whitespace/cleanWhitespace.js";
export class StringMatcher {
    constructor(value) {
        this.value = value;
    }
    _isNonNil;
    get isNonNil() {
        return this._isNonNil ?? (this._isNonNil = isNotBlank(this.value));
    }
    _isValid;
    get isValid() {
        return this._isValid ?? (this._isValid = isDefined(this.value));
    }
    _lower;
    get lower() {
        return this._lower ?? (this._lower = this.value?.toLowerCase() ?? "");
    }
    _matchValue;
    get matchValue() {
        return this._matchValue ?? (this._matchValue = StringMatcher.clean(this.value));
    }
    value;
    matches(other) {
        if (!this.isValid || other === null || other === undefined) {
            return false;
        }
        if (typeof (other) === "string") {
            if (this.isNonNil) {
                return this.matchValue === StringMatcher.clean(other);
            }
            return isBlank(other);
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
    static clean(value) {
        return cleanWhitespace(normalizeAscii(removeAccents(String(value ?? "")))).toLowerCase();
    }
    static matches(value, other) {
        return StringMatcher.from(value).matches(other);
    }
    static matchesAny(value, others) {
        return StringMatcher.from(value).matchesAny(others);
    }
    static from(value) {
        return new StringMatcher(typeof (value) === "string" ? value : value?.value);
    }
}
