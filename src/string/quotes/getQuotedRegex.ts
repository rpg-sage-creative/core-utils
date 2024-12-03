import { rewrite } from "regex";
import { captureRegex } from "../../regex/captureRegex.js";
import { getOrCreateRegex } from "../../regex/getOrCreateRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpQuantifier, RegExpQuantifyOptions } from "../../regex/RegExpOptions.js";
import { getQuotePairs, type QuoteStyle } from "./getQuotePairs.js";

/** @internal Reusable function for ensuring consistent regex creation. Exported only for testing. */
export function createQuotedRegexPart([left, right]: string, quantifier: RegExpQuantifier): string {
	return `${left}(?:[^${right}\\\\]|\\\\.)${quantifier}${right}`;
}

export type RegExpQuoteOptions = {
	/** Specifies allowed number of characters inside the quotes. */
	quantifier?: RegExpQuantifier;

	/** Specifies limitations to the style of quotes allowed. */
	style?: QuoteStyle;
};

type Options = RegExpFlagOptions & RegExpCaptureOptions & RegExpAnchorOptions & RegExpQuantifyOptions & RegExpQuoteOptions;

export type QuotedRegexRegExp = RegExp & {
	leftChars: string;
	rightChars: string;
};

/** Creates a new instance of the word character regex based on options. */
function createQuotedRegex(options?: Options): QuotedRegexRegExp {
	const { anchored, capture, gFlag = "", iFlag = "", quantifier = "+", style = "any" } = options ?? {};

	const leftChars: string[] = [];
	const rightChars: string[] = [];
	const parts: string[] = [];
	getQuotePairs(style).forEach(pair => {
		leftChars.push(pair.chars[0]);
		rightChars.push(pair.chars[1]);
		parts.push(createQuotedRegexPart(pair.chars, quantifier));
	});

	const quotedRegex = new RegExp(`(?<!\\\\)(?:${parts.join("|")})`);

	const capturedRegex = capture
		? captureRegex(quotedRegex, capture)
		: quotedRegex;

	const anchoredRegex = anchored
		? new RegExp(`^(?:${capturedRegex.source})$`, capturedRegex.flags)
		: capturedRegex;

	const { expression, flags } = rewrite(anchoredRegex.source, { flags:gFlag + iFlag });
	const regexp = new RegExp(expression, flags) as QuotedRegexRegExp;
	regexp.leftChars = leftChars.join("");
	regexp.rightChars = rightChars.join("");
	return regexp;
}

/**
 * Returns an instance of the quoted regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { anchored:false, capture:undefined, gFlag:"", iFlag:"", quantifier:"+", style:"any" }
 */
export function getQuotedRegex(options?: Options): QuotedRegexRegExp {
	return getOrCreateRegex(createQuotedRegex, options) as QuotedRegexRegExp;
}