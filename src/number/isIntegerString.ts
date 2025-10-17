import type { Optional } from "../types/generics.js";

/** /[\-+]?\d+/ */
export const IntegerRegExp = /[\-+]?\d+/;

type IntegerString = `${"-"|"+"|""}${number}`;

export function isIntegerString(value: Optional<string>): value is IntegerString {
	if (!value) return false;
	const match = IntegerRegExp.exec(value);
	return match?.index === 0 && match[0].length === value.length;
}