import { codeBlockSafeSplit } from "../codeBlocks/codeBlockSafeSplit.js";
import { chunkLine } from "./chunkLine.js";
export function chunk(input, options) {
    if (!input?.length) {
        return [];
    }
    const lines = codeBlockSafeSplit(input, options?.lineSplitter ?? "\n");
    const { maxChunkLength = 0 } = options ?? {};
    const isMaxChunkFn = typeof (maxChunkLength) === "function";
    if (!isMaxChunkFn && maxChunkLength <= 0) {
        return lines;
    }
    const data = {
        chunks: [],
        currentChunk: undefined,
        currentIndex: -1,
        maxChunkLength: isMaxChunkFn ? maxChunkLength : () => maxChunkLength
    };
    lines.forEach((line, lineIndex) => chunkLine({ data, line, lineIndex, options }));
    if (data.currentChunk?.length ?? 0 > 0) {
        data.currentIndex = data.chunks.push(data.currentChunk);
    }
    return data.chunks;
}
