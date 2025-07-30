import { escapeRegex } from "../regex/escapeRegex.js";
import { isDefined, isNullOrUndefined, isString } from "../types/index.js";
import { isNotBlank } from "./blank/index.js";
import { normalizeAscii, removeAccents } from "./normalize/index.js";
import { cleanWhitespace, getWhitespaceRegex, HORIZONTAL_WHITESPACE_REGEX_SOURCE, WHITESPACE_REGEX_SOURCE } from "./whitespace/index.js";
export class StringMatcher {
    constructor(value) {
        this.value = value;
    }
    _isNonNil;
    get isNonNil() {
        return this._isNonNil ??= isNotBlank(this.value);
    }
    _isValid;
    get isValid() {
        return this._isValid ??= isDefined(this.value);
    }
    _lower;
    get lower() {
        return this._lower ??= this.value?.toLowerCase() ?? "";
    }
    _matchValue;
    get matchValue() {
        return this._matchValue ??= StringMatcher.clean(this.value);
    }
    value;
    matches(other) {
        if (!this.isValid || isNullOrUndefined(other)) {
            return false;
        }
        if (isString(other)) {
            other = new StringMatcher(other);
        }
        if (!other.isValid || this.isNonNil !== other.isNonNil) {
            return false;
        }
        return this.matchValue === other.matchValue;
    }
    matchesAny(...args) {
        return args.flat(1).some(value => this.matches(value));
    }
    toRegex({ anchored = true, asterisk, horizontalOnly, whitespace } = {}) {
        const whitespaceRegex = getWhitespaceRegex({ horizontalOnly, quantifier: undefined });
        const whitespaceSource = horizontalOnly ? HORIZONTAL_WHITESPACE_REGEX_SOURCE : WHITESPACE_REGEX_SOURCE;
        const whitespaceQuantifier = whitespace === "optional" ? "*" : "+";
        let lastCharWasWhitespace = false;
        const regex = this.value?.split("").map(char => {
            if (char === "*" && asterisk) {
                return ".*?";
            }
            if (whitespaceRegex.test(char)) {
                if (!lastCharWasWhitespace) {
                    lastCharWasWhitespace = true;
                    return whitespaceSource + whitespaceQuantifier;
                }
                return "";
            }
            lastCharWasWhitespace = false;
            const cleaned = StringMatcher.clean(char);
            const escaped = escapeRegex(cleaned);
            if (char !== cleaned && char !== cleaned.toUpperCase()) {
                if (char.length === 1 && cleaned.length === 1 && cleaned === escaped) {
                    return `[${char}${cleaned}]`;
                }
                else {
                    return `(?:${char}|${escaped})`;
                }
            }
            return escaped;
        }).join("") ?? "";
        return new RegExp(anchored ? `^${regex}$` : regex, "i");
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
        if (isDefined(value)) {
            return value instanceof StringMatcher
                ? value
                : new StringMatcher(typeof (value) === "string" ? value : value?.value);
        }
        return new StringMatcher(value);
    }
}
