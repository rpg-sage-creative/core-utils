import { isQuoted } from "./isQuoted.js";

/**
 * Removes first and last character if they are both quotes.
 * @todo make unescaping quoted characters optional ...
 */
export function dequote(value: string): string {
	if (isQuoted(value)) {
		// get the quote chars
		const left = value[0]!;
		const right = value[value.length - 1]!;

		// remove the quote chars
		value = value.slice(1, -1);

		// unescape chars
		value = value.replaceAll(`\\${left}`, left);
		if (left !== right) {
			value = value.replaceAll(`\\${right}`, right);
		}
	}
	return value;
}