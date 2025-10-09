import { regex } from "regex";
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
export const AllCodeBlocksRegExpG = new RegExp(AllCodeBlocksRegExp, "g");
export function createAllCodeBlocksRegExpG() {
    return new RegExp(AllCodeBlocksRegExp, "g");
}
