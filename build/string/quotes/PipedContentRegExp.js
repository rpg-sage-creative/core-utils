import { regex } from "regex";
export const PipedContentRegExp = regex() `
	(?<!\\)   # not escaped
	\|{2}     # 2 pipes
	(.|\n)+?  # required content that allows newline, but isn't greedy
	(?<!\\)   # not escaped
	\|{2}     # 2 pipes
`;
