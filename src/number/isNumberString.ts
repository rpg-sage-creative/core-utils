import type { Optional } from "../types/generics.js";

/** /[\-\+]?\d+(?:\.\d+)?/ */
export const NumberStringRegExp = /[\-\+]?\d+(?:\.\d+)?/;

type NumberString = `${"-"|"+"|""}${number}`;

export function isNumberString(value: Optional<string>): value is NumberString {
	if (!value) return false;
	const match = NumberStringRegExp.exec(value);
	return match?.index === 0 && match[0].length === value.length;
}