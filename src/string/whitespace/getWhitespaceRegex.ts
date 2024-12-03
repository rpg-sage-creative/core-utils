import { rewrite } from "regex";
import { captureRegex } from "../../regex/captureRegex.js";
import { getOrCreateRegex } from "../../regex/getOrCreateRegex.js";
import { quantifyRegex } from "../../regex/quantifyRegex.js";
import type { RegExpCaptureOptions, RegExpFlagOptions, RegExpQuantifyOptions } from "../../regex/RegExpOptions.js";

export const WHITESPACE_REGEX_SOURCE = `\\s`;
export const HORIZONTAL_WHITESPACE_REGEX_SOURCE = `[^\\S\\r\\n]`;

type Options = RegExpFlagOptions & RegExpCaptureOptions & RegExpQuantifyOptions & {
	/** uses HORIZONTAL_WHITESPACE_REGEX_SOURCE if true, \s otherwise */
	horizontalOnly?: boolean;
};

/** Creates a new instance of the whitespace regex based on options. */
function createWhitespaceRegex(options?: Options): RegExp {
	const { capture, gFlag = "", horizontalOnly, iFlag = "", quantifier = "+" } = options ?? {};

	const whitespace = horizontalOnly ? HORIZONTAL_WHITESPACE_REGEX_SOURCE : WHITESPACE_REGEX_SOURCE;

	const whitespaceRegex = new RegExp(whitespace, iFlag);

	const quantifiedRegex = quantifier
		? quantifyRegex(whitespaceRegex, quantifier)
		: whitespaceRegex;

	const capturedRegex = capture
		? captureRegex(quantifiedRegex, capture)
		: quantifiedRegex;

	const { expression, flags } = rewrite(capturedRegex.source, { flags:gFlag + iFlag });
	return new RegExp(expression, flags);
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