import { regex } from "regex";
import { dequote, MisquotedContentRegExp, QuotedContentRegExp } from "../string/quotes/index.js";
import { Arg } from "./Arg.js";
export const KeyValueArgRegExp = regex() `
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
`;
export function parseKeyValueArg(raw, index) {
    if (raw) {
        const match = KeyValueArgRegExp.exec(raw);
        if (match?.index === 0 && match[0].length === raw.length) {
            const { key, value: val } = match.groups;
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
