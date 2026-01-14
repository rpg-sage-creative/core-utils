import { regex } from "regex";
import { Arg } from "./Arg.js";
import { AlphaNumericDashDotArgKeyRegExp } from "./regexp.js";
export const FlagArgRegExp = regex() `
	(
		-{1,2}
		|
		\u2014 # MDASH; iOS apparently has an autocorrect feature that converts two dashes to an MDASH
	)
	(?<key> ${AlphaNumericDashDotArgKeyRegExp} )
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
