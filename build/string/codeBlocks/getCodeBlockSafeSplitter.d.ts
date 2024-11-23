type StringSplitter = {
    /** @private contains the value to split on */
    _splitter: string | RegExp;
    /** the split symbol used by String.split */
    [Symbol.split](value: string, limit?: number): string[];
};
/**
 * Creates a string splitter that is capable of ignoring code blocks using backticks (`).
 * Defaults to splitting on "\n".
 */
export declare function getCodeBlockSafeSplitter(): StringSplitter;
/**
 * Creates a string splitter that is capable of ignoring code blocks using backticks (`).
 */
export declare function getCodeBlockSafeSplitter(splitter: string | RegExp): StringSplitter;
export {};
