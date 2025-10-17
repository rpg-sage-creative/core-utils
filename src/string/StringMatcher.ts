import type { Matcher, MatcherResolvable, Optional } from "../index.js";
import { escapeRegex } from "../regex/escapeRegex.js";
import { isBoolean, isDefined, isNullOrUndefined, isString } from "../types/index.js";
import { isNotBlank } from "./blank/index.js";
import { normalizeApostrophes, normalizeDashes, normalizeEllipses, normalizeQuotes, removeAccents } from "./normalize/index.js";
import { cleanWhitespace, HorizontalWhitespaceRegExp, WhitespaceRegExp } from "./whitespace/index.js";

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

/** If no values are set, all are assumed to be true. */
type CleanOptions = {
	cleanWhitespace?: boolean;
	normalizeApostrophes?: boolean;
	normalizeDashes?: boolean;
	normalizeEllipses?: boolean;
	normalizeQuotes?: boolean;
	removeAccents?: boolean;
	toLowerCase?: boolean;
};

/** A reusable object for comparing a string without the need to repeatedly manipulate the value. */
export class StringMatcher implements Matcher {
	public constructor(value: Optional<string>, cleanOptions?: CleanOptions) {
		this.value = isDefined(value) ? String(value) : value;

		if (cleanOptions) {
			const keys = ["removeAccents", "normalizeApostrophes", "normalizeDashes", "normalizeEllipses", "normalizeQuotes", "cleanWhitespace", "toLowerCase"] as (keyof CleanOptions)[];
			this.cleanOptions = keys.reduce((out, key) => {
				const bool = cleanOptions[key];
				if (isDefined(bool)) {
					out[key] = !!bool;
				}
				return out;
			}, {} as CleanOptions);
		}
	}

	/** Stores isNotBlank(value) */
	private _isNonNil?: boolean;

	/** Returns isNotBlank(value) */
	public get isNonNil(): boolean {
		return this._isNonNil ??= isNotBlank(this.value);
	}

	/** Stores isDefined(value) */
	private _isValid?: boolean;

	/** Returns isDefined(value) */
	public get isValid(): boolean {
		return this._isValid ??= isDefined(this.value);
	}

	/** Stores value?.toLowerCase() ?? "" */
	private _lower?: string;

	public get lower(): string {
		return this._lower ??= this.value?.toLowerCase() ?? "";
	}

	/** The value used to compare to other values. */
	private _matchValue?: string;

	/** The value used to compare to other values. */
	public get matchValue(): string {
		return this._matchValue ??= StringMatcher.clean(this.value, this.cleanOptions);
	}

	public cleanOptions?: CleanOptions;

	/** Stores the raw value. */
	public value: Optional<string>;

	/** Compares the clean values. */
	public matches(other: MatcherResolvable): boolean {
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

	/** Returns true if any of the given values are considered a match. */
	public matchesAny(values: MatcherResolvable[]): boolean;

	/** Returns true if any of the given values are considered a match. */
	public matchesAny(...values: MatcherResolvable[]): boolean;

	public matchesAny(...args: MatcherResolvable[] | MatcherResolvable[][]): boolean {
		return args.flat(1).some(value => this.matches(value));
	}

	/** Converts the matchValue into a regular expression. */
	public toRegex({ anchored = true, asterisk, horizontalOnly, whitespace }: StringMatcherToRegExpOptions = {}): RegExp {
		// reuse cached regex for whitespace
		const whitespaceRegex = horizontalOnly ? HorizontalWhitespaceRegExp : WhitespaceRegExp;
		const whitespaceSource = whitespaceRegex.source.slice(0, -1); // remove the trailing +
		const whitespaceQuantifier = whitespace === "optional" ? "*" : "+";

		let lastCharWasWhitespace = false;
		const regex = this.value?.split("").map(char => {
			// don't be greedy
			if (char === "*" && asterisk) {
				return ".*?";
			}

			// deal with whitespace options
			if (whitespaceRegex.test(char)) {
				// we only include whitespace char class once
				if (!lastCharWasWhitespace) {
					// toggle the flag to true
					lastCharWasWhitespace = true;
					// add char class and quantifier
					return whitespaceSource + whitespaceQuantifier;
				}
				return "";
			}

			// toggle the flag to false
			lastCharWasWhitespace = false;

			// clean the character
			const cleaned = StringMatcher.clean(char, this.cleanOptions);

			// escape the character
			const escaped = escapeRegex(cleaned);

			// something changed, so lets do a character class or non-capture group
			// ex: ë gets cleaned to e, so we want our regex to match [eë]
			if (char !== cleaned && char !== cleaned.toUpperCase()) {
				// if 1 char is cleaned to 1 char and it doesn't get escaped, use a character class
				if (char.length === 1 && cleaned.length === 1 && cleaned === escaped) {
					return `[${char}${cleaned}]`;
				}else {
					return `(?:${char}|${escaped})`;
				}
			}

			// finally, return the escaped character
			return escaped;
		}).join("") ?? "";

		return new RegExp(anchored ? `^${regex}$` : regex, "i");
	}

	/** Returns the original value. */
	public toString(): Optional<string> {
		return this.value;
	}

	/**
	 * Cleans the given value to make comparisons more reliable.
	 * Convenience for cleanWhitespace(normalizeAscii(removeAccents(String(value ?? "")))).toLowerCase()
	 * If options are given, then only those cleaning functions marked as true are used to manipulate the value.
	 */
	public static clean(value: Optional<string>, options: CleanOptions = {}): string {
		// return empty string if we have nothing to do
		if (isNullOrUndefined(value)) return "";

		// prep incoming value for type safety
		value = String(value ?? "");

		// the functions to call in the correct order to call them
		const optionFunctions = [removeAccents, normalizeApostrophes, normalizeDashes, normalizeEllipses, normalizeQuotes, cleanWhitespace, toLowerCase];

		// If no values are set, all are assumed to be true.
		const optionDefaultValue = !optionFunctions.some(fn => isBoolean(options[fn.name as keyof CleanOptions]));

		// iterate the functions
		optionFunctions.forEach(fn => {
			// only call the function if it is explicitly set or all are assumed to be set by none of them being set
			if (options[fn.name as keyof CleanOptions] ?? optionDefaultValue) {
				value = fn(value as string);
			}
		});

		return value;

		function toLowerCase(value: string) { return value.toLowerCase(); }
	}

	/** Convenience for StringMatcher.from(value).matches(other) */
	public static matches(value: MatcherResolvable, other: MatcherResolvable, options?: CleanOptions): boolean {
		return StringMatcher.from(value, options).matches(other);
	}

	/** Convenience for StringMatcher.from(value).matchesAny(others) */
	public static matchesAny(value: MatcherResolvable, others: MatcherResolvable[], options?: CleanOptions): boolean {
		return StringMatcher.from(value, options).matchesAny(others);
	}

	/** Convenience for new StringMatcher(value) */
	public static from(value: Optional<MatcherResolvable>, options?: CleanOptions): StringMatcher {
		if (isDefined(value)) {
			if (value instanceof StringMatcher) {
				return value;
			}
			return new StringMatcher(isString(value) ? value : value?.value, options);
		}
		return new StringMatcher(value, options);
	}
}
