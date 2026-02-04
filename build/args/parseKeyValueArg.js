import { regex } from "regex";
import { dequote, MisquotedContentRegExp, PipedContentRegExp, QuotedContentRegExp } from "../string/quotes/index.js";
import { Arg } from "./Arg.js";
import { AlphaNumericDashDotArgKeyRegExp } from "./regexp.js";
export const KeyValueArgRegExp = regex() `
	# word break include ^ | \s; also other characters like brackets []
	\b

	(?<key> ${AlphaNumericDashDotArgKeyRegExp} )

	=

	(?<value>
		# quoted
		(?<quotedValue> ${QuotedContentRegExp} )

		|

		# mismatched
		(?<misquotedValue> ${MisquotedContentRegExp} )

		|

		# piped
		(?<pipedValue> ${PipedContentRegExp} )

		|

		# naked non-space non-bracket non-brace value
		(?<nakedValue> [^ \s \[ \] \{ \} ]+ )
	)
`;
export function parseKeyValueArg(raw, index) {
    if (raw) {
        const match = KeyValueArgRegExp.exec(raw);
        if (match?.index === 0 && match[0].length === raw.length) {
            const { key, pipedValue, nakedValue, value: val } = match.groups;
            const isNaked = pipedValue || nakedValue ? true : undefined;
            const value = isNaked ? val : dequote(val);
            return Arg.from({
                index,
                isKeyValue: true,
                isNaked,
                key,
                raw,
                value: value === "" ? null : value,
            });
        }
    }
    return undefined;
}
