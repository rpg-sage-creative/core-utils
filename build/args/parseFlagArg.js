import { regex } from "regex";
import { Arg } from "./Arg.js";
export const FlagArgRegExp = regex() `
	-{1,2}
	(?<key>
		\g<alphaNumeric>                    # letters and numbers only (a leading dash is a FlagArg)
		(
			\g<alphaNumericDash>*           # letters, numbers, dashes, and periods
			\g<alphaNumeric>                # letters and numbers only (a traling dash is a IncrementArg)
		)*
	)


	(?(DEFINE)
		(?<alphaNumeric> [ \w \p{L} \p{N} ] )
		(?<alphaNumericDash> [ \w \p{L} \p{N} \- ] )
	)
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
