import { regex } from "regex";
import type { Optional } from "../types/generics.js";
import type { TypedRegExp } from "../types/TypedRegExp.js";
import { Arg } from "./Arg.js";
import type { FlagArg } from "./types.js";

type FlagArgMatchGroups = {
	key: string;
};

export const FlagArgRegExp = regex()`
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