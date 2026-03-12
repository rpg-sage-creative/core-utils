import { isDefined, isNullOrUndefined, isString } from "@rsc-utils/type-utils";
import { cleanWhitespace, HorizontalWhitespaceRegExp, WhitespaceRegExp } from "@rsc-utils/whitespace-utils";
import { escapeRegex } from "../regex/escapeRegex.js";
import { isNotBlank } from "./blank/index.js";
import { normalizeApostrophes, normalizeDashes, normalizeEllipses, normalizeQuotes, removeAccents } from "./normalize/index.js";
function toLowerCase(value) {
    return value.toLowerCase();
}
export class StringMatcher {
    value;
    cleanOptions;
    constructor(value, cleanOptions) {
        this.value = value;
        this.cleanOptions = cleanOptions;
        if (isDefined(value) && !isString(value)) {
            this.value = String(value);
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
        return args
            .flat(1)
            .some(value => this.matches(value));
    }
    toRegex({ anchored = true, asterisk, horizontalOnly, whitespace } = {}) {
        if (!this.isValid)
            return /^$/;
        const whitespaceRegex = horizontalOnly
            ? HorizontalWhitespaceRegExp
            : WhitespaceRegExp;
        const whitespaceSource = whitespaceRegex.source.slice(0, -1);
        const whitespaceQuantifier = whitespace === "optional"
            ? "*"
            : "+";
        let lastCharWasWhitespace = false;
        const regex = this.value.split("").map(char => {
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
        }).join("");
        return new RegExp(anchored ? `^${regex}$` : regex, "i");
    }
    toString() {
        return this.value;
    }
    static clean(value, options = {}) {
        if (!isString(value)) {
            return "";
        }
        const optionFunctions = [
            removeAccents,
            normalizeApostrophes,
            normalizeDashes,
            normalizeEllipses,
            normalizeQuotes,
            cleanWhitespace,
            toLowerCase
        ];
        const shouldCallAllFunctions = !optionFunctions.some(fn => fn.name in options);
        for (const fn of optionFunctions) {
            const shouldCallFunction = shouldCallAllFunctions
                || options[fn.name];
            if (shouldCallFunction) {
                value = fn(value);
            }
        }
        return value;
    }
    static matches(value, other, options) {
        return StringMatcher
            .from(value, options)
            .matches(other);
    }
    static matchesAny(value, others, options) {
        return StringMatcher
            .from(value, options)
            .matchesAny(others);
    }
    static from(value, options) {
        if (isDefined(value)) {
            if (value instanceof StringMatcher) {
                return value;
            }
            const stringValue = isString(value)
                ? value
                : value?.value;
            return new StringMatcher(stringValue, options);
        }
        return new StringMatcher(value, options);
    }
}
