import { getOrCreateRegex } from "../regex/getOrCreateRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpSpoilerOptions } from "../regex/RegExpOptions.js";

type NumberOptions = {
	/** default is optional */
	sign?: "none" | "required";
	/** default is either */
	type?: "decimal" | "integer";
};

type CreateOptions = RegExpFlagOptions & NumberOptions;
type GetOptions = RegExpFlagOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegExpSpoilerOptions & NumberOptions;

/** Creates a new instance of the number regex based on options. */
function createNumberRegex(options?: CreateOptions): RegExp {
	const { gFlag = "", iFlag = "", sign = "optional", type = "optional" } = options ?? {};
	const signPart = { none:"", optional:"[\\-+]?", required:"[\\-+]" }[sign];
	const integerPart = { decimal:"", integer:"(?<!\\d+\\.\\d*)", optional:"" }[type];
	const decimalPart = { decimal:"(?:\\.\\d+)", integer:"(?!\\.\\d)", optional:"(?:\\.\\d+)?" }[type];
	return new RegExp(`${signPart}${integerPart}\\d+${decimalPart}`, gFlag + iFlag);
}

/**
 * Returns an instance of the number regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 */
export function getNumberRegex(options?: GetOptions): RegExp {
	return getOrCreateRegex(createNumberRegex, options);
}