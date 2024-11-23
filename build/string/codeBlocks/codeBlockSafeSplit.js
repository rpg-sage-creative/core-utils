import { pattern, regex } from "regex";
import { matchCodeBlocks } from "./matchCodeBlocks.js";
export function codeBlockSafeSplit(value, splitter, limit) {
    const lines = [];
    const testLimit = limit !== undefined;
    const codeBlocks = matchCodeBlocks(value);
    const source = typeof (splitter) === "string" ? splitter : pattern(splitter.source);
    const regexp = regex("g") `${source}`;
    let index = -1;
    let lastIndex = 0;
    do {
        do {
            index = regexp.exec(value)?.index ?? -1;
        } while (-1 < index && codeBlocks.find(codeBlock => codeBlock.index < index && index < codeBlock.index + codeBlock.length));
        if (-1 < index) {
            lines.push(value.slice(lastIndex, index));
            lastIndex = index + 1;
        }
        else {
            lines.push(value.slice(lastIndex));
        }
        if (testLimit && lines.length === limit) {
            break;
        }
    } while (-1 < index);
    return lines;
}
