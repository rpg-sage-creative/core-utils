import { regex } from "regex";

/** Matches some mismatched double quoted pairs, with content optional. */
export const MismatchedQuotedContentRegExp = regex()`
	# ‘ mismatched double quotes
	[“”"]
	(
		[^“”"]        # any non-quote
		|             # or
		(?<=\\)[“”"]  # quote after a slash
	)*
	[“”"]
`;
