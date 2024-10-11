import { rewrite } from "regex";
import { copyFlags } from "./internal/copyFlags.js";

/**
 * Returns RegExp that is properly captured using the given options.
 */
export function captureRegex(regexp: RegExp, captureGroup: string) {
	const source = `(?<${captureGroup}>${regexp.source})`;
	const options = { flags:copyFlags(regexp) };
	const { expression, flags } = rewrite(source, options);
	return new RegExp(expression, flags);
}