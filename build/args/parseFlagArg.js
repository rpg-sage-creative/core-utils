import { regex } from "regex";
import { Arg } from "./Arg.js";
export const FlagArgRegExp = regex() `
	(?<= ^ | \s )                # start of line or whitespace

	-{1,2}
	(?<key>
		[ \w \p{L} \p{N} ]           # we want a letter/number before more dashes
		(
			[ \w \p{L} \p{N} \- ]*   # letters, numbers, and dashes
			[ \w \p{L} \p{N} ]       # letters and numbers only (a traling dash is a IncrementArg)
		)*
	)

	(?= \s | $ )                 # whitespace or end of line
`;
export function parseFlagArg(raw, index) {
    if (raw) {
        const match = FlagArgRegExp.exec(raw);
        if (match?.index === 0 && match[0].length === raw.length) {
            return Arg.from({
                index,
                isFlag: true,
                key: match.groups.key,
                raw,
            });
        }
    }
    return undefined;
}
