import { codeBlockSafeSplit } from "./codeBlockSafeSplit.js";
/**
 * Creates a string splitter that is capable of ignoring code blocks using backticks (`).
 * Defaults to splitting on "\n".
 */
export function getCodeBlockSafeSplitter(splitter = "\n") {
    return {
        _splitter: splitter,
        [Symbol.split](value, limit) {
            if (value.includes("`")) {
                return codeBlockSafeSplit(value, this._splitter, { limit });
            }
            return value.split(this._splitter, limit);
        }
    };
}
