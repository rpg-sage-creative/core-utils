import { getOrCreateRegex } from "../../regex/getOrCreateRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpQuantifyOptions } from "../../regex/RegExpOptions.js";

export const WHITESPACE_REGEX_SOURCE = `\\s`;
export const HORIZONTAL_WHITESPACE_REGEX_SOURCE = `[^\\S\\r\\n]`;

type Options = RegExpFlagOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegExpQuantifyOptions & {
	/** uses HORIZONTAL_WHITESPACE_REGEX_SOURCE if true, \s otherwise */
	horizontalOnly?: boolean;
};

/** Creates a new instance of the whitespace regex based on options. */
function createWhitespaceRegex(options?: Options): RegExp {
	const { anchored, capture, gFlag = "", horizontalOnly, iFlag = "", quantifier = "+" } = options ?? {};

	const whitespace = horizontalOnly ? HORIZONTAL_WHITESPACE_REGEX_SOURCE : WHITESPACE_REGEX_SOURCE;
	const flags = gFlag + iFlag;
	const whitespaceRegex = new RegExp(whitespace, flags);

	const quantifiedRegex = quantifier
		? new RegExp(`(?:${whitespaceRegex.source})${quantifier}`, flags)
		: whitespaceRegex;

	const capturedRegex = capture
		? new RegExp(`(?<${capture}>${quantifiedRegex.source})`, flags)
		: quantifiedRegex;

	const anchoredRegex = anchored
		? new RegExp(`^(?:${capturedRegex.source})$`, flags)
		: capturedRegex;

	return anchoredRegex;
}

/**
 * Returns an instance of the number regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { anchored:false, capture:undefined, gFlag:false, horizontalOnly:false, iFlag:false, quantifier:"+" }
 */
export function getWhitespaceRegex(options?: Options): RegExp {
	return getOrCreateRegex(createWhitespaceRegex, options);
}