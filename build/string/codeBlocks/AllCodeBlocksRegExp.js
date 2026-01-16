import { regex } from "regex";
import { globalizeRegex } from "../../regex/globalizeRegex.js";
export const AllCodeBlocksRegExp = regex() `
	(
		(?<ticks> ((?<!\\)${"`"}){3} )
		(?<content> (.|\n)*? )
		((?<!\\)${"`"}){3}
	)
	|
	(
		(?<ticks> ((?<!\\)${"`"}){2} )
		(?<content> .*? )
		((?<!\\)${"`"}){2}
	)
	|
	(
		(?<ticks> ((?<!\\)${"`"}){1} )
		(?<content> .*? )
		((?<!\\)${"`"}){1}
	)
`;
export const AllCodeBlocksRegExpG = globalizeRegex(AllCodeBlocksRegExp);
