import { regex } from "regex";
import { NumberRegExp } from "../number/isNumberString.js";
import { dequote, MisquotedNumberRegExp, QuotedNumberRegExp } from "../string/index.js";
import { Arg } from "./Arg.js";
export const IncrementArgRegExp = regex() `
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
`;
export function parseIncrementArg(raw, index) {
    if (raw) {
        const match = IncrementArgRegExp.exec(raw);
        if (match?.index === 0 && match[0].length === raw.length) {
            const { key, decrement, increment, operator, value: val } = match.groups;
            const stringValue = decrement || increment ? "1" : dequote(val);
            const value = +stringValue;
            if (isNaN(value))
                return undefined;
            return Arg.from({
                index,
                isIncrement: true,
                key,
                operator: decrement?.[0] ?? increment?.[0] ?? operator[0],
                raw,
                value,
            });
        }
    }
    return undefined;
}
