import { pattern, regex } from "regex";
import { copyFlags } from "./internal/copyFlags.js";

/**
 * Returns RegExp that is properly wrapped anchored using ^ and $.
 */
export function anchorRegex(regexp: RegExp) {
	const flags = copyFlags(regexp);
	const source = pattern(regexp.source);
	return regex(flags)`^${source}$`;
}