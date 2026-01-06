import { regex } from "regex";
import type { Optional } from "../types/generics.js";
import type { TypedRegExp } from "../types/TypedRegExp.js";
import { Arg } from "./Arg.js";
import type { FlagArg } from "./types.js";

type FlagArgMatchGroups = {
	key: string;
};

export const FlagArgRegExp = regex()`
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
` as TypedRegExp<FlagArgMatchGroups>;

// export const FlagArgRegExpG = new RegExp(FlagArgRegExp, "g") as TypedRegExp<FlagArgMatchGroups>;

export function parseFlagArg<KeyType extends string = string>(raw: Optional<string>, index?: number): FlagArg<KeyType> | undefined;
export function parseFlagArg(raw: Optional<string>, index?: number): FlagArg | undefined {
	if (raw) {
		const match = FlagArgRegExp.exec(raw);
		if (match?.index === 0 && match[0].length === raw.length) {
			return Arg.from({
				index,
				isFlag: true,
				key: match.groups.key,
				// value: raw,
				raw,
			});
		}
	}
	return undefined;
}