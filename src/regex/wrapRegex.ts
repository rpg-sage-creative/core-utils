import { splitChars } from "../string/wrap/splitChars.js";
import { escapeRegex } from "./escapeRegex.js";

/**
 * Used to wrap a piece of RegExp, usually with (), [], {}, or <>.
 * If the chars argument is even, then they are split and used as left/right.
 * If the chars argument is odd, then they are uesd as left and then they are reversed and used as right.
 */
export function wrapRegex(regexp: RegExp, chars: string, required: "optional" | true) {
	const { left, right } = splitChars(chars);
	const lPattern = escapeRegex(left);
	const rPattern = escapeRegex(right);

	return required === "optional"
		? new RegExp(`(?:${lPattern}(?:${regexp.source})${rPattern})|(?:${regexp.source})`, regexp.flags)
		: new RegExp(`${lPattern}(?:${regexp.source})${rPattern}`, regexp.flags);
}