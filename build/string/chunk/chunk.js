import { chunkLine } from "./chunkLine.js";
import { parseChunkOptions } from "./parseChunkOptions.js";
export function chunk(input, argOne, argTwo) {
    if (!input?.length) {
        return [];
    }
    const options = parseChunkOptions(argOne, argTwo);
    const lines = input.split(options.lineSplitter);
    if (typeof (options.maxChunkLength) !== "function" && (options.maxChunkLength ?? 0) <= 0) {
        return lines;
    }
    const data = {
        chunks: [],
        currentChunk: undefined,
        currentIndex: -1,
        maxChunkLength: typeof options.maxChunkLength === "function"
            ? options.maxChunkLength
            : () => options.maxChunkLength
    };
    lines.forEach((line, lineIndex) => chunkLine(data, options, line, lineIndex));
    if (data.currentChunk?.length ?? 0 > 0) {
        data.currentIndex = data.chunks.push(data.currentChunk);
    }
    return data.chunks;
}
