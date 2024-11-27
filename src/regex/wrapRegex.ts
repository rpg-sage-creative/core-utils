import { regex } from "regex";
import { splitChars } from "../string/wrap/splitChars.js";
import { copyFlags } from "./internal/copyFlags.js";

/**
 * Used to wrap a piece of RegExp, usually with (), [], {}, or <>.
 * If the chars argument is even, then they are split and used as left/right.
 * If the chars argument is odd, then they are uesd as left and then they are reversed and used as right.
 */
export function wrapRegex(regexp: RegExp, chars: string, required: "optional" | true) {
	const { left, right } = splitChars(chars);

	const flags = copyFlags(regexp);
	const wrappedRegex = regex(flags)`${left} ${regexp} ${right}`;

	if (required === "optional") {
		return regex(flags)`${wrappedRegex} | ${regexp}`;
	}

	return wrappedRegex;
}