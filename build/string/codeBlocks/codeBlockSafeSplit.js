import { regex } from "regex";
import { tokenize } from "../tokenize.js";
import { getCodeBlockRegex } from "./getCodeBlockRegex.js";
export function codeBlockSafeSplit(value, splitter, options) {
    const { limit } = options ?? {};
    const tokenParsers = {
        three: getCodeBlockRegex(),
        splitter: typeof (splitter) === "string" ? regex `${splitter}` : splitter
    };
    const tokens = tokenize(value, tokenParsers);
    const lines = [""];
    let lineIndex = 0;
    for (const { key, token } of tokens) {
        switch (key) {
            case "splitter":
                lineIndex = lines.push("") - 1;
                break;
            default:
                lines[lineIndex] += token;
                break;
        }
    }
    return lines.slice(0, limit);
}
