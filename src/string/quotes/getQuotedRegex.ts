import { rewrite } from "regex";
import { anchorRegex } from "../../regex/anchorRegex.js";
import { captureRegex } from "../../regex/captureRegex.js";
import { getOrCreateRegex } from "../../regex/internal/getOrCreateRegex.js";
import type { RegExpQuantifier } from "../../regex/quantifyRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpCreateOptions, RegExpQuantifyOptions } from "../../regex/RegExpOptions.js";
import { getQuotePairs, type QuoteStyle } from "./getQuotePairs.js";

/** @internal Reusable function for ensuring consistent regex creation. Exported only for testing. */
export function createQuotedRegexPart([left, right]: string, quantifier: RegExpQuantifier): string {
	return `(?!\\\\)${left}(?:[^${right}\\\\]|\\\\.)${quantifier}${right}`;
}

export type RegExpQuoteOptions = {
	/** Specifies allowed number of characters inside the quotes. */
	quantifier?: RegExpQuantifier;

	/** Specifies limitations to the style of quotes allowed. */
	style?: QuoteStyle;
};

type Options = RegExpCreateOptions & RegExpCaptureOptions & RegExpAnchorOptions & RegExpQuantifyOptions & RegExpQuoteOptions;

/** Creates a new instance of the word character regex based on options. */
function createQuotedRegex(options?: Options): RegExp {
	const { anchored, capture, gFlag = "", iFlag = "", quantifier = "+", style = "any" } = options ?? {};

	const parts = getQuotePairs(style).map(pair => createQuotedRegexPart(pair.chars, quantifier));
	const quotedRegex = new RegExp(parts.join("|"));

	const capturedRegex = capture
		? captureRegex(quotedRegex, capture)
		: quotedRegex;

	const anchoredRegex = anchored
		? anchorRegex(capturedRegex)
		: capturedRegex;

	const { expression, flags } = rewrite(anchoredRegex.source, { flags:gFlag + iFlag });
	return new RegExp(expression, flags);
}

/**
 * Returns an instance of the quoted regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { anchored:false, capture:undefined, gFlag:"", iFlag:"", quantifier:"+", style:"any" }
 */
export function getQuotedRegex(options?: Options): RegExp {
	return getOrCreateRegex(createQuotedRegex, options);
}