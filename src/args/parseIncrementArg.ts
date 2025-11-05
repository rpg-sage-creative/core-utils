import { regex } from "regex";
import { dequote, QuotedNumberRegExp } from "../string/index.js";
import type { Optional } from "../types/generics.js";
import type { TypedRegExp } from "../types/TypedRegExp.js";
import { Arg } from "./Arg.js";
import type { IncrementArg } from "./types.js";

type IncrementArgMatchGroups = {
	key: string;
	decrement?: "--";
	increment?: "++";
	operator?: "+=" | "-=";
	value: string;
};

export const IncrementArgRegExp = regex()`
	(?<= ^ | \s )               # start of line or whitespace

	(?<key>
		[ \w \p{L} \p{N} ]          # letters and numbers only (a leading dash is a FlagArg)
		(
			[ \w \p{L} \p{N} \- \. ]*   # letters, numbers, dashes, and periods
			[ \w \p{L} \p{N} ]          # letters and numbers only (capture the increment dash below)
		)*
	)

	(
		(?<decrement>
			-{2}
		)

		|

		(?<increment>
			\+{2}
		)

		|

		(?<operator>
			[ \- \+ ] =
		)
		(?<value>
			# quoted
			${QuotedNumberRegExp}

			|

			# naked
			\d+(\.\d+)?
		)
	)

	(?= \s | $ )                # whitespace or end of line
` as TypedRegExp<IncrementArgMatchGroups>;

// export const IncrementArgRegExpG = new RegExp(INCREMENT_ARG_REGEX, "g") as TypedRegExp<IncrementArgMatchGroups>;

export function parseIncrementArg<ValueType extends string = string>(raw: Optional<string>, index?: number): IncrementArg<string, ValueType> | undefined;
export function parseIncrementArg<KeyType extends string = string, ValueType extends string = string>(raw: Optional<string>, index?: number): IncrementArg<KeyType, ValueType> | undefined;
export function parseIncrementArg(raw: Optional<string>, index?: number): IncrementArg | undefined {
	if (raw) {
		const match = IncrementArgRegExp.exec(raw);
		if (match?.index === 0 && match[0].length === raw.length) {
			const { key, decrement, increment, operator, value:val } = match.groups;
			const stringValue = decrement || increment ? "1" : dequote(val);
			const value = +stringValue;
			// ensure we have a valid number
			if (isNaN(value)) return undefined;

			return Arg.from({
				index,
				isIncrement: true,
				key,
				operator: decrement?.[0] as "-" ?? increment?.[0] ?? operator![0],
				raw,
				value,
			});
		}
	}
	return undefined;
}