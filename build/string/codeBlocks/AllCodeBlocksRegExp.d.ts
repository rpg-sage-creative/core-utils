import type { TypedRegExp } from "../../types/TypedRegExp.js";
export type CodeBlockRegexGroups = {
    ticks: string;
    content: string;
};
/**
 * Matches code blocks with 1, 2, or 3 ticks.
 * Intended for reuse with .test() or as a TokenParser.
 * If 3 ticks, then single or double ticks and new lines are allowed in the content.
 * If 2 ticks, then single ticks are allowed in the content, but not new lines.
 * If 1 tick, then no ticks and no new lines are allowed in the content.
*/
export declare const AllCodeBlocksRegExp: TypedRegExp<CodeBlockRegexGroups>;
/**
 * AllCodeBlocksRegExp with the global flag.
 * Intended for use with string.match(), string.matchAll(), and string.replace().
*/
export declare const AllCodeBlocksRegExpG: TypedRegExp<CodeBlockRegexGroups, string, string | undefined>;
