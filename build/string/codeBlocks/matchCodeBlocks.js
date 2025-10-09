import { AllCodeBlocksRegExpG } from "./AllCodeBlocksRegExp.js";
export function matchCodeBlocks(content) {
    const matches = [];
    const iterator = content.matchAll(AllCodeBlocksRegExpG);
    for (const execArray of iterator) {
        const { index, 0: match, groups: { ticks, content } } = execArray;
        matches.push({ index, length: match.length, match, ticks, content });
    }
    return matches;
}
