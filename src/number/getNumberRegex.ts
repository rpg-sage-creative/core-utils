import { regex, rewrite } from "regex";
import { anchorRegex } from "../regex/anchorRegex.js";
import { captureRegex } from "../regex/captureRegex.js";
import { getOrCreateRegex } from "../regex/internal/getOrCreateRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpSpoilerOptions } from "../regex/RegExpOptions.js";
import { spoilerRegex } from "../regex/spoilerRegex.js";

type Options = RegExpFlagOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegExpSpoilerOptions;

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

	const { expression, flags } = rewrite(anchoredRegex.source, { flags:gFlag + iFlag });
	return new RegExp(expression, flags);
}

/**
 * Returns an instance of the number regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 */
export function getNumberRegex(options?: Options): RegExp {
	return getOrCreateRegex(createNumberRegex, options);
}