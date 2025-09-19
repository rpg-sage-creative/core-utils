import type { RegExpFlagOptions } from "../../regex/RegExpOptions.js";
export type CodeBlockRegexGroups = {
    ticks1: string;
    content1: string;
} | {
    ticks2: string;
    content2: string;
} | {
    ticks3: string;
    content3: string;
};
type GetOptions = RegExpFlagOptions & {
    ticks?: 1 | 2 | 3;
};
export declare function getCodeBlockRegex(options?: GetOptions): RegExp;
export {};
