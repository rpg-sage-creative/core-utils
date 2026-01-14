import { regex } from "regex";
import { NumberRegExp } from "../number/isNumberString.js";
import { dequote, MisquotedNumberRegExp, QuotedNumberRegExp } from "../string/index.js";
import { Arg } from "./Arg.js";
import { AlphaNumericDashDotArgKeyRegExp } from "./regexp.js";
export const IncrementArgRegExp = regex() `
	# word break include ^ | \s; also other characters like brackets []
	\b

	(?<key> ${AlphaNumericDashDotArgKeyRegExp} )

	(
		(?<decrement>
			-{2}

			|

			# MDASH; iOS apparently has an autocorrect feature that converts two dashes to an MDASH
			\u2014
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
`;
export function parseIncrementArg(raw, index) {
    if (raw) {
        const match = IncrementArgRegExp.exec(raw);
        if (match?.index === 0 && match[0].length === raw.length) {
            const { key, decrement: opDec, increment: opInc, operator: op, value: val } = match.groups;
            const stringValue = opDec || opInc ? "1" : dequote(val);
            const value = +stringValue;
            if (isNaN(value))
                return undefined;
            const operator = (opDec ?? opInc ?? op)[0].replace("\u2014", "-");
            return Arg.from({
                index,
                isIncrement: true,
                key,
                operator,
                raw,
                value,
            });
        }
    }
    return undefined;
}
