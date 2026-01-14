import { regex } from "regex";
import { dequote, MisquotedContentRegExp, QuotedContentRegExp } from "../string/quotes/index.js";
import { Arg } from "./Arg.js";
import { AlphaNumericDashDotArgKeyRegExp, AlphaNumericRegExp } from "./regexp.js";
export const KeyValueArgRegExp = regex() `
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
