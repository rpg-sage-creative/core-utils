import { matchCodeBlocks } from "./matchCodeBlocks.js";
export function redactCodeBlocks(content, redactedCharacter = "*") {
    const matches = matchCodeBlocks(content);
    matches.forEach(({ index, ticks, length }) => {
        const ends = "".padEnd(ticks, "`");
        const center = "".padEnd(length - ticks * 2, redactedCharacter);
        const redacted = ends + center + ends;
        content = content.slice(0, index)
            + redacted
            + content.slice(index + length);
    });
    return content;
}
