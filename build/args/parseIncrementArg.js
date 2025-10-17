import { regex } from "regex";
import { dequote, QuotedNumberRegExp } from "../string/index.js";
import { Arg } from "./Arg.js";
export const IncrementArgRegExp = regex() `
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
