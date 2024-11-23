import { regex } from "regex";
import { captureRegex } from "./captureRegex.js";
import { getOrCreateRegex } from "./internal/getOrCreateRegex.js";
import { quantifyRegex, type RegExpQuantifier } from "./quantifyRegex.js";
import type { RegExpCaptureOptions, RegExpCreateOptions, RegExpQuantifyOptions } from "./RegExpOptions.js";

export const HORIZONTAL_WHITESPACE_REGEX_SOURCE = `[^\\S\\r\\n]`;

// Use this in the implementation to confirm we conform to our reused types.
type RegExpOptions = RegExpCreateOptions & RegExpCaptureOptions & RegExpQuantifyOptions & {
	/** uses HORIZONTAL_WHITESPACE_REGEX if true, \s otherwise */
	horizontalOnly?: boolean;
};

// Use this is in the docs to be more readable.
type Options = {
	/** capture the RegExp with a named capture group */
	capture?: string;

	/** include the global flag in the regex */
	gFlag?: "g" | "";

	/** uses HORIZONTAL_WHITESPACE_REGEX if true, \s otherwise */
	horizontalOnly?: boolean;

	/** include the case insensitive flag in the regex */
	iFlag?: "i" | "";

	/** how many to capture */
	quantifier?: RegExpQuantifier;
};

/** Creates a new instance of the whitespace regex based on options. */
function createWhitespaceRegex(options?: Options): RegExp;

function createWhitespaceRegex(options?: RegExpOptions): RegExp {
	const { capture, gFlag = "", horizontalOnly, iFlag = "", quantifier = "+" } = options ?? {};

	const whitespace = horizontalOnly ? HORIZONTAL_WHITESPACE_REGEX_SOURCE : "\\s";

	const whitespaceRegex = regex(iFlag)`${whitespace}`;

	const quantifiedRegex = quantifier
		? quantifyRegex(whitespaceRegex, quantifier)
		: whitespaceRegex;

	const capturedRegex = capture
		? captureRegex(quantifiedRegex, capture)
		: quantifiedRegex;

	return regex(gFlag + iFlag)`${capturedRegex}`;
}

/**
 * Returns an instance of the number regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { capture:undefined, gFlag:false, horizontalOnly:false, iFlag:false, quantifier:"+" }
 */
export function getWhitespaceRegex(options?: Options): RegExp {
	return getOrCreateRegex(createWhitespaceRegex, options);
}