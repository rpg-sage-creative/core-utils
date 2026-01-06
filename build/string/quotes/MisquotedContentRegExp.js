import { regex } from "regex";
export const MisquotedContentRegExp = regex() `
	# mismatched double quotes
	[“”"]
	(
		[^“”"]        # any non-quote
		|             # or
		(?<=\\)[“”"]  # quote after a slash
	)*
	[“”"]

	|

	# mismatched single quotes
	['‘’]
	(
		[^'‘’]      # any non-quote
		|         # or
		(?<=\\)['‘’]  # quote after a slash
	)*
	['‘’]
`;
