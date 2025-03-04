import { type RegExpIncrementArgOptions } from "./getIncrementArgRegex.js";
export type IncrementArg<T extends string = string> = {
    /** key for the flag or pair */
    key: string;
    keyLower: string;
    /** how to increment/decrement */
    operator: "+" | "-";
    /** arg for ValueData, value for a PairData; null for pair with empty string, undefined for a flag */
    value: T;
};
export declare function parseIncrementArg<T extends string = string>(arg: string, options?: RegExpIncrementArgOptions): IncrementArg<T> | undefined;
