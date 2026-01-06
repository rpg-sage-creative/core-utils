import { regex } from "regex";
import type { IncrementArg, Optional, TypedRegExp } from "../index.js";
import { NumberRegExp } from "../number/isNumberString.js";
import { dequote, MisquotedNumberRegExp, QuotedNumberRegExp } from "../string/index.js";
import { Arg } from "./Arg.js";

type IncrementArgMatchGroups = {
	key: string;
	decrement?: "--";
	increment?: "++";
	operator?: "+=" | "-=";
	value: string;
};

export const IncrementArgRegExp = regex()`
	\b                                  # word break include ^ | \s; also other characters like brackets []

	(?<key>
		\g<alphaNumeric>                    # letters and numbers only (a leading dash is a FlagArg)
		(
			\g<alphaNumericDashDot>*        # letters, numbers, dashes, and periods
			\g<alphaNumeric>                # letters and numbers only (a traling dash is a IncrementArg)
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
			(?<quotedValue> ${QuotedNumberRegExp} )

			|

			# mismatched
			(?<misquotedValue> ${MisquotedNumberRegExp} )

			|

			# naked
			(?<nakedValue> ${NumberRegExp} )
		)
	)


	(?(DEFINE)
		(?<alphaNumeric> [ \w \p{L} \p{N} ] )
		(?<alphaNumericDashDot> [ \w \p{L} \p{N} \- \. ] )
	)
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