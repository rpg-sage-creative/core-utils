import { pattern, regex, rewrite } from "regex";
import { captureRegex } from "../regex/captureRegex.js";
import { getOrCreateRegex } from "../regex/internal/getOrCreateRegex.js";
import { quantifyRegex } from "../regex/quantifyRegex.js";
import type { RegExpCaptureOptions, RegExpCreateOptions, RegExpQuantifyOptions } from "../regex/RegExpOptions.js";

/** Expected to be used inside a character class: `[${WORD_CHARACTERS_REGEX_PARTIAL_SOURCE}]` */
// export const WORD_CHARACTERS_REGEX_PARTIAL_SOURCE = `\\w\\p{L}\\p{N}`;

// Use this in the implementation to confirm we conform to our reused types.
type Options = RegExpCreateOptions & RegExpCaptureOptions & RegExpQuantifyOptions & {
	/** determines if dashes are allowed */
	allowDashes?: boolean;

	/** determines if periods are allowed */
	allowPeriods?: boolean;
};

/** Creates a new instance of the word character regex based on options. */
function createWordCharacterRegex(options?: Options): RegExp {
	const { capture, gFlag = "", iFlag = "", quantifier = "" } = options ?? {};

	const dash = options?.allowDashes ? "\\-" : "";
	const period = options?.allowPeriods ? "\\." : "";

	const wordCharacterRegex = regex`[\w\p{L}\p{N}${pattern(dash)}${pattern(period)}]`;

	const quantifiedRegex = quantifier
		? quantifyRegex(wordCharacterRegex, quantifier)
		: wordCharacterRegex;

	const capturedRegex = capture
		? captureRegex(quantifiedRegex, capture)
		: quantifiedRegex;

	const { expression, flags } = rewrite(capturedRegex.source, { flags:gFlag + iFlag });
	return new RegExp(expression, flags);
}

/**
 * Returns an instance of the word character regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { allowDashes:false, allowPeriods:false, capture:undefined, gFlag:false, iFlag:false, quantifier:"" }
 */
export function getWordCharacterRegex(options?: Options): RegExp {
	return getOrCreateRegex(createWordCharacterRegex, options);
}