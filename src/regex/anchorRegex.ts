import { pattern, regex } from "regex";
import { copyFlags } from "./internal/copyFlags.js";

/**
 * Returns RegExp that is properly "anchored" using ^ and $.
 * Because this uses the regex library, the resulting RegExp will include the "u" flag.
 */
export function anchorRegex(regexp: RegExp): RegExp {
	const flags = copyFlags(regexp);
	const source = pattern(regexp.source);
	return regex(flags)`^${source}$`;
}