import { type RegexWordCharOptions } from "../characters/getWordCharacterRegex.js";
import type { RegExpFlagOptions } from "../regex/RegExpOptions.js";
export type RegExpIncrementArgOptions = {
    /** Specifiies a key literal. */
    key?: string;
};
type CreateOptions = RegExpFlagOptions & RegexWordCharOptions & RegExpIncrementArgOptions;
type GetOptions = CreateOptions;
export declare function getIncrementArgRegex(options?: GetOptions): RegExp;
export {};
