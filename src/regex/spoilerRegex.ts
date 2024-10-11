import { regex, rewrite } from "regex";
import { copyFlags } from "./internal/copyFlags.js";

/**
 * Returns RegExp that is properly wrapped in spoilers as indicated by the given options.
 */
export function spoilerRegex(regexp: RegExp, spoilers: "optional" | true) {
	// use interpolated string literal "||" to properly escape them
	const pipes = regex`${"||"}`.source;

	const groupedSource = `(?:${regexp.source})`;
	const pipedSource = `${pipes} ${groupedSource} ${pipes}`;

	const options = { flags:copyFlags(regexp) };

	if (spoilers === "optional") {
		const { expression, flags } = rewrite(`${pipedSource} | ${groupedSource}`, options);
		return new RegExp(expression, flags);
	}

	const { expression, flags } = rewrite(pipedSource, options);
	return new RegExp(expression, flags);
}