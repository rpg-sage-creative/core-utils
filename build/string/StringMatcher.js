import { escapeRegex } from "../regex/escapeRegex.js";
import { isBoolean, isDefined, isNullOrUndefined, isString } from "../types/index.js";
import { isNotBlank } from "./blank/index.js";
import { normalizeApostrophes, normalizeDashes, normalizeEllipses, normalizeQuotes, removeAccents } from "./normalize/index.js";
import { cleanWhitespace, getWhitespaceRegex, HORIZONTAL_WHITESPACE_REGEX_SOURCE, WHITESPACE_REGEX_SOURCE } from "./whitespace/index.js";
export class StringMatcher {
    constructor(value, cleanOptions) {
        this.value = isDefined(value) ? String(value) : value;
        if (cleanOptions) {
            const keys = ["removeAccents", "normalizeApostrophes", "normalizeDashes", "normalizeEllipses", "normalizeQuotes", "cleanWhitespace", "toLowerCase"];
            this.cleanOptions = keys.reduce((out, key) => {
                const bool = cleanOptions[key];
                if (isDefined(bool)) {
                    out[key] = !!bool;
                }
                return out;
            }, {});
        }
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
        return this._matchValue ??= StringMatcher.clean(this.value, this.cleanOptions);
    }
    cleanOptions;
    value;
    matches(other) {
        if (!this.isValid || isNullOrUndefined(other)) {
            return false;
        }
        if (isString(other)) {
            other = new StringMatcher(other, this.cleanOptions);
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
            const cleaned = StringMatcher.clean(char, this.cleanOptions);
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
    static clean(value, options = {}) {
        if (isNullOrUndefined(value))
            return "";
        value = String(value ?? "");
        const optionFunctions = [removeAccents, normalizeApostrophes, normalizeDashes, normalizeEllipses, normalizeQuotes, cleanWhitespace, toLowerCase];
        const optionDefaultValue = !optionFunctions.some(fn => isBoolean(options[fn.name]));
        optionFunctions.forEach(fn => {
            if (options[fn.name] ?? optionDefaultValue) {
                value = fn(value);
            }
        });
        return value;
        function toLowerCase(value) { return value.toLowerCase(); }
    }
    static matches(value, other, options) {
        return StringMatcher.from(value, options).matches(other);
    }
    static matchesAny(value, others, options) {
        return StringMatcher.from(value, options).matchesAny(others);
    }
    static from(value, options) {
        if (isDefined(value)) {
            if (value instanceof StringMatcher) {
                return value;
            }
            return new StringMatcher(isString(value) ? value : value?.value, options);
        }
        return new StringMatcher(value, options);
    }
}
