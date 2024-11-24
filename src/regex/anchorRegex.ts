import { rewrite } from "regex";
import { copyFlags } from "./internal/copyFlags.js";

/**
 * Returns RegExp that is properly "anchored" using ^ and $.
 * Because this uses the regex library, the resulting RegExp will include the "u" flag.
 */
export function anchorRegex(regexp: RegExp): RegExp {
	const source = `^(?:${regexp.source})$`;
	const options = { flags:copyFlags(regexp) };
	const { expression, flags } = rewrite(source, options);
	return new RegExp(expression, flags);
}