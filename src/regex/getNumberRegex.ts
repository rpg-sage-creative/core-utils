import { regex } from "regex";
import { anchorRegex } from "./anchorRegex.js";
import { captureRegex } from "./captureRegex.js";
import { getOrCreateRegex } from "./internal/getOrCreateRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpCreateOptions, RegExpSpoilerOptions } from "./RegExpOptions.js";
import { spoilerRegex } from "./spoilerRegex.js";

type Options = RegExpCreateOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegExpSpoilerOptions;

/** Creates a new instance of the number regex based on options. */
function createNumberRegex(options?: Options): RegExp {
	const { anchored, capture, gFlag = "", iFlag = "", spoilers } = options ?? {};

	const numberRegex = regex(iFlag)`
		[\-+]?    # optional pos/neg sign
		\d+       # integer portion
		(\.\d+)?  # optional decimal portion
	`;

	const spoileredRegex = spoilers
		? spoilerRegex(numberRegex, spoilers)
		: numberRegex;

	const capturedRegex = capture
		? captureRegex(spoileredRegex, capture)
		: spoileredRegex;

	const anchoredRegex = anchored
		? anchorRegex(capturedRegex)
		: capturedRegex;

	return regex(gFlag + iFlag)`${anchoredRegex}`;
}

/**
 * Returns an instance of the number regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 */
export function getNumberRegex(options?: Options): RegExp {
	return getOrCreateRegex(createNumberRegex, options);
}