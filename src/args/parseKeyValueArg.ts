import { regex } from "regex";
import { dequote } from "../string/index.js";
import { QuotedContentRegExp } from "../string/quotes/QuotedContentRegExp.js";
import type { Optional } from "../types/generics.js";
import type { TypedRegExp } from "../types/TypedRegExp.js";
import { Arg } from "./Arg.js";
import type { KeyValueArg } from "./types.js";

export type KeyValueArgMatchGroups = {
	key: string;
	value: string;
};

export const KeyValueArgRegExp = regex()`
	(?<= ^ | \s )               # start of line or whitespace

	(?<key>
		[ \w \p{L} \p{N} ]          # letters and numbers only (a leading dash is a FlagArg)
		(
			[ \w \p{L} \p{N} \- \. ]*   # letters, numbers, dashes, and periods
			[ \w \p{L} \p{N} ]          # letters and numbers only (a traling dash is a IncrementArg)
		)*
	)

	=

	(?<value>
		# quoted
		${QuotedContentRegExp}

		|

		# naked (must start with a non-quote non-whitespace)
		[^ \s \n \r " “ ' ‘ ] \S*
	)

	(?= \s | $ )                # whitespace or end of line
` as TypedRegExp<KeyValueArgMatchGroups>;

/**
 * Returns KeyValueArg if the input is a valid key/value pairing, undefined otherwise.
 * If key is given then the key must match the valid key/value pair.
 */
export function parseKeyValueArg<ValueType extends string = string>(input: Optional<string>, index?: number): KeyValueArg<string, ValueType> | undefined;
export function parseKeyValueArg<KeyType extends string = string, ValueType extends string = string>(input: Optional<string>, index?: number): KeyValueArg<KeyType, ValueType> | undefined;
export function parseKeyValueArg(raw: Optional<string>, index?: number): KeyValueArg | undefined {
	if (raw) {
		const match = KeyValueArgRegExp.exec(raw);
		if (match?.index === 0 && match[0].length === raw.length) {
			const value = dequote(match.groups.value);

			return Arg.from({
				index,
				isKeyValue: true,
				key: match.groups.key,
				raw,
				value: value === "" ? null : value,
			});
		}
	}
	return undefined;
}
