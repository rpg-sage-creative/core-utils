import { regex } from "regex";
export const MismatchedQuotedContentRegExp = regex() `
	# ‘ mismatched double quotes
	[“”"]
	(
		[^“”"]        # any non-quote
		|             # or
		(?<=\\)[“”"]  # quote after a slash
	)*
	[“”"]
`;
