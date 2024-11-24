import { rewrite } from "regex";
import { anchorRegex } from "./anchorRegex.js";
import { captureRegex } from "./captureRegex.js";
import { getOrCreateRegex } from "./internal/getOrCreateRegex.js";
import type { RegExpQuantifier } from "./quantifyRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpCreateOptions, RegExpQuantifyOptions } from "./RegExpOptions.js";

/** @internal Reusable function for ensuring consistent regex creation. Exported only for testing. */
export function createQuotedRegexPart([left, right]: string, quantifier: RegExpQuantifier): string {
	return `${left}(?:[^${right}\\\\]|\\\\.)${quantifier}${right}`;
}

/**
 * "any" all double and single quotes, no limitations
 *
 * "double" limits to double quotes
 * "single" limits to single quotes
 *
 * "strict" limits to pure "double" and 'single' quotes
 * "fancy" limits to pure "double" and 'single' and curly “double” and ‘single’ quotes
 *
 * "double-strict" limits to pure "double" quotes
 * "double-fancy" limits to pure "double" and curly “double” quotes
 *
 * "single-strict" limits to pure 'single' quotes
*/
export type QuoteStyle = "any" | "double" | "single" | "strict" | "fancy" | "double-strict" | "double-fancy" | "single-strict";

type Options = RegExpCreateOptions & RegExpCaptureOptions & RegExpAnchorOptions & RegExpQuantifyOptions & {

	/** Specifies allowed number of characters inside the quotes. */
	quantifier?: RegExpQuantifier;

	/** Specifies limitations to the style of quotes allowed. */
	style?: QuoteStyle;
};

/** Creates a new instance of the word character regex based on options. */
function createQuotedRegex(options?: Options): RegExp {
	const { anchored, capture, gFlag = "", iFlag = "", quantifier = "+", style = "any" } = options ?? {};

	const parts: string[] = [];
	if (!style.includes("double")) {
		// basic single quote (tick)
		parts.push(createQuotedRegexPart(`''`, quantifier));

		// fancy single quote (curly)
		if (!style.includes("strict")) {
			parts.push(createQuotedRegexPart(`‘’`, quantifier));
		}

	}
	if (!style.includes("single")) {
		// basic double quote
		parts.push(createQuotedRegexPart(`""`, quantifier));

		if (!style.includes("strict")) {
			// fancy double quote (curly)
			parts.push(createQuotedRegexPart(`“”`, quantifier));

			// extended double quotes (german/polish)
			if (!style.includes("fancy")) {
				parts.push(createQuotedRegexPart(`„“`, quantifier));
				parts.push(createQuotedRegexPart(`„”`, quantifier));
			}

		}

	}
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
 * Default options: { anchored:false, capture:undefined, extended:true, gFlag:"", iFlag:"", quantifier:"+", singleDouble:"both", strict:false }
 */
export function getQuotedRegex(options?: Options): RegExp {
	return getOrCreateRegex(createQuotedRegex, options);
}