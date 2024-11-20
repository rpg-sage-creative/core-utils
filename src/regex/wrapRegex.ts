import { regex, rewrite } from "regex";
import { splitChars } from "../string/wrap/splitChars.js";
import { copyFlags } from "./internal/copyFlags.js";

/**
 * Used to wrap a piece of RegExp, usually with (), [], {}, or <>.
 * If the chars argument is even, then they are split and used as left/right.
 * If the chars argument is odd, then they are uesd as left and then they are reversed and used as right.
 */
export function wrapRegex(regexp: RegExp, chars: string, required: "optional" | true) {
	const leftRight = splitChars(chars);

	// use interpolated string literal to properly escape the chars
	const left = regex`${leftRight.left}`.source;
	const right = regex`${leftRight.right}`.source;

	const groupedSource = `(?:${regexp.source})`;
	const wrappedSource = `${left} ${groupedSource} ${right}`;

	const options = { flags:copyFlags(regexp) };

	if (required === "optional") {
		const { expression, flags } = rewrite(`${wrappedSource} | ${groupedSource}`, options);
		return new RegExp(expression, flags);
	}

	const { expression, flags } = rewrite(wrappedSource, options);
	return new RegExp(expression, flags);
}