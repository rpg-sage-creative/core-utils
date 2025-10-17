import { regex } from "regex";
export const QuotedContentRegExp = regex() `
	# "" simple double quotes
	"
	(
		[^"]      # any non-quote
		|         # or
		(?<=\\)"  # quote after a slash
	)*
	"

	|

	# “” fancy double quotes
	“
	(
		[^”]      # any non-quote
		|         # or
		(?<=\\)”  # quote after a slash
	)*
	”

	|

	# '' simple single quotes
	'
	(
		[^']      # any non-quote
		|         # or
		(?<=\\)'  # quote after a slash
	)*
	'

	|

	# ‘’ fancy single quotes
	‘
	(
		[^’]      # any non-quote
		|         # or
		(?<=\\)’  # quote after a slash
	)*
	’
`;
