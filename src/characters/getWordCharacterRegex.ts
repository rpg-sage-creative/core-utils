import { pattern, regex, rewrite } from "regex";
import { captureRegex } from "../regex/captureRegex.js";
import { getOrCreateRegex } from "../regex/getOrCreateRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpQuantifyOptions } from "../regex/RegExpOptions.js";

/** Expected to be used inside a character class: `[${WORD_CHARACTERS_REGEX_PARTIAL_SOURCE}]` */
// export const WORD_CHARACTERS_REGEX_PARTIAL_SOURCE = `\\w\\p{L}\\p{N}`;

export type RegexWordCharOptions = {
	/** determines if dashes are allowed */
	allowDashes?: boolean;

	/** determines if periods are allowed */
	allowPeriods?: boolean;
};

// Use this in the implementation to confirm we conform to our reused types.
type Options = RegExpFlagOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegExpQuantifyOptions & RegexWordCharOptions;

/** Creates a new instance of the word character regex based on options. */
function createWordCharacterRegex(options?: Options): RegExp {
	const { allowDashes, allowPeriods, anchored, capture, gFlag = "", iFlag = "", quantifier = "" } = options ?? {};

	const dash = allowDashes ? "\\-" : "";
	const period = allowPeriods ? "\\." : "";

	const wordCharacterRegex = regex`[\w\p{L}\p{N}${pattern(dash)}${pattern(period)}]`;

	const quantifiedRegex = quantifier
		? new RegExp(`(?:${wordCharacterRegex.source})${quantifier}`, wordCharacterRegex.flags)
		: wordCharacterRegex;

	const capturedRegex = capture
		? captureRegex(quantifiedRegex, capture)
		: quantifiedRegex;

	const anchoredRegex = anchored
		? new RegExp(`^(?:${capturedRegex.source})$`, capturedRegex.flags)
		: capturedRegex;

	const { expression, flags } = rewrite(anchoredRegex.source, { flags:gFlag + iFlag });
	return new RegExp(expression, flags);
}

/**
 * Returns an instance of the word character regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { allowDashes:false, allowPeriods:false, anchored:false, capture:undefined, gFlag:false, iFlag:false, quantifier:"" }
 */
export function getWordCharacterRegex(options?: Options): RegExp {
	return getOrCreateRegex(createWordCharacterRegex, options);
}