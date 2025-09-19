import { matchCodeBlocks } from "../codeBlocks/matchCodeBlocks.js";
export function redactCodeBlocks(content, redactedCharacter = "*") {
    const matches = matchCodeBlocks(content);
    matches.forEach(({ index, length, ticks, content: matchContent }) => {
        const center = "".padEnd(matchContent.length, redactedCharacter);
        const redacted = ticks + center + ticks;
        content = content.slice(0, index)
            + redacted
            + content.slice(index + length);
    });
    return content;
}
