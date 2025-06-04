import type { Optional } from "../types/generics.js";
import type { Matcher, MatcherResolvable } from "../types/Matcher.js";
type StringMatcherToRegExpOptions = {
    /** if set to true then the regex begins with ^ and ends with $; default value is true */
    anchored?: boolean;
    /** if set to true then a * in the value is treated as .*? in the regexp */
    asterisk?: boolean;
    /** if set to "optional" then a whitespace charater in the value is treated as \s* in the regexp */
    whitespace?: "optional";
    /** if set to true then only horizontal whitespace will be made optional */
    horizontalOnly?: boolean;
};
/** A reusable object for comparing a string without the need to repeatedly manipulate the value. */
export declare class StringMatcher implements Matcher {
    constructor(value: Optional<string>);
    /** Stores isNotBlank(value) */
    private _isNonNil?;
    /** Returns isNotBlank(value) */
    get isNonNil(): boolean;
    /** Stores isDefined(value) */
    private _isValid?;
    /** Returns isDefined(value) */
    get isValid(): boolean;
    private _lower?;
    get lower(): string;
    /** The value used to compare to other values. */
    private _matchValue?;
    /** The value used to compare to other values. */
    get matchValue(): string;
    /** Stores the raw value. */
    value: Optional<string>;
    /** Compares the clean values. */
    matches(other: MatcherResolvable): boolean;
    /** Returns true if any of the given values are considered a match. */
    matchesAny(values: MatcherResolvable[]): boolean;
    /** Returns true if any of the given values are considered a match. */
    matchesAny(...values: MatcherResolvable[]): boolean;
    /** Converts the matchValue into a regular expression. */
    toRegex({ anchored, asterisk, horizontalOnly, whitespace }?: StringMatcherToRegExpOptions): RegExp;
    /** Returns the original value. */
    toString(): Optional<string>;
    /**
     * Cleans the given value to make comparisons more reliable.
     * Convenience for cleanWhitespace(normalizeAscii(removeAccents(String(value ?? "")))).toLowerCase()
     */
    static clean(value: Optional<string>): string;
    /** Convenience for StringMatcher.from(value).matches(other) */
    static matches(value: MatcherResolvable, other: MatcherResolvable): boolean;
    /** Convenience for StringMatcher.from(value).matchesAny(others) */
    static matchesAny(value: MatcherResolvable, others: MatcherResolvable[]): boolean;
    /** Convenience for new StringMatcher(value) */
    static from(value: Optional<MatcherResolvable>): StringMatcher;
}
export {};
