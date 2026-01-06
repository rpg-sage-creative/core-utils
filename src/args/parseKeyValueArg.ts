import { regex } from "regex";
import type { KeyValueArg, Optional, TypedRegExp } from "../index.js";
import { dequote, MisquotedContentRegExp, QuotedContentRegExp } from "../string/quotes/index.js";
import { Arg } from "./Arg.js";

export type KeyValueArgMatchGroups = {
	key: string;
	value: string;
	quotedValue?: string;
	misquotedValue?: string;
	nakedValue?: string;
};

export const KeyValueArgRegExp = regex()`
	\b                                      # word break include ^ | \s; also other characters like brackets []

	(?<key>
		\g<alphaNumeric>                    # letters and numbers only (a leading dash is a FlagArg)
		(
			\g<alphaNumericDashDot>*        # letters, numbers, dashes, and periods
			\g<alphaNumeric>                # letters and numbers only (a traling dash is a IncrementArg)
		)*
	)

	=

	(?<value>
		# quoted
		(?<quotedValue> ${QuotedContentRegExp} )

		|

		# mismatched
		(?<misquotedValue> ${MisquotedContentRegExp} )

		|

		# naked
		(?<nakedValue> \g<alphaNumeric>+ )
		\b                                  # word break include $ | \s; also other characters like brackets []
	)


	(?(DEFINE)
		(?<alphaNumeric> [ \w \p{L} \p{N} ] )
		(?<alphaNumericDashDot> [ \w \p{L} \p{N} \- \. ] )
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
