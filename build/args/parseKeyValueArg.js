import { regex } from "regex";
import { dequote } from "../string/index.js";
import { QuotedContentRegExp } from "../string/quotes/QuotedContentRegExp.js";
import { Arg } from "./Arg.js";
export const KeyValueArgRegExp = regex() `
	(?<= ^ | \s )               # start of line or whitespace

	(?<key>
		[ \w \p{L} \p{N} ]          # letters and numbers only (a leading dash is a FlagArg)
		(
			[ \w \p{L} \p{N} \- \. ]*   # letters, numbers, dashes, and periods
			[ \w \p{L} \p{N} ]          # letters and numbers only (a traling dash is a IncrementArg)
		)*
	)

	=

	(?<value>
		# quoted
		${QuotedContentRegExp}

		|

		# naked (must start with a non-quote non-whitespace)
		[^ \s \n \r " “ ' ‘ ] \S*
	)

	(?= \s | $ )                # whitespace or end of line
`;
export function parseKeyValueArg(raw, index) {
    if (raw) {
        const match = KeyValueArgRegExp.exec(raw);
        if (match?.index === 0 && match[0].length === raw.length) {
            const value = dequote(match.groups.value);
            return Arg.from({
                index,
                isKeyValue: true,
                key: match.groups.key,
                raw,
                value: value === "" ? null : value,
            });
        }
    }
    return undefined;
}
