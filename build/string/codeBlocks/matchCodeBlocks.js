import { getCodeBlockRegex } from "./getCodeBlockRegex.js";
export function matchCodeBlocks(content) {
    const matches = [];
    const iterator = content.matchAll(getCodeBlockRegex({ gFlag: "g" }));
    for (const execArray of iterator) {
        const { index, 0: match, groups } = execArray;
        const ticks = groups.ticks1 ?? groups.ticks2 ?? groups.ticks3;
        const content = groups.content1 ?? groups.content2 ?? groups.content3;
        matches.push({ index, length: match.length, match, ticks, content });
    }
    return matches;
}
