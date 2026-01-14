import { regex } from "regex";
import type { KeyValueArg, Optional, TypedRegExp } from "../index.js";
import { dequote, MisquotedContentRegExp, QuotedContentRegExp } from "../string/quotes/index.js";
import { Arg } from "./Arg.js";
import { AlphaNumericDashDotArgKeyRegExp, AlphaNumericRegExp } from "./regexp.js";

export type KeyValueArgMatchGroups = {
	key: string;
	value: string;
	quotedValue?: string;
	misquotedValue?: string;
	nakedValue?: string;
};

export const KeyValueArgRegExp = regex()`
	\b                                      # word break include ^ | \s; also other characters like brackets []

	(?<key> ${AlphaNumericDashDotArgKeyRegExp} )

	=

	(?<value>
		# quoted
		(?<quotedValue> ${QuotedContentRegExp} )

		|

		# mismatched
		(?<misquotedValue> ${MisquotedContentRegExp} )

		|

		# naked
		(?<nakedValue> ${AlphaNumericRegExp}+ )
		\b                                  # word break include $ | \s; also other characters like brackets []
	)
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
			const { key, value:val } = match.groups;
			const value = dequote(val);

			return Arg.from({
				index,
				isKeyValue: true,
				key,
				raw,
				value: value === "" ? null : value,
			});
		}
	}
	return undefined;
}
