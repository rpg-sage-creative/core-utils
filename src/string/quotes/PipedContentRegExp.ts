import { regex } from "regex";

/** Matches piped content: ||content|| */
export const PipedContentRegExp = regex()`
	(?<!\\)  # not escaped
	\|{2}    # 2 pipes
	(.|\n)+  # required content that allows newline
	(?<!\\)  # not escaped
	\|{2}    # 2 pipes
`;
