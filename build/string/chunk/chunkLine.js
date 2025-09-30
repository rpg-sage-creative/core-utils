import { codeBlockSafeSplit } from "../codeBlocks/codeBlockSafeSplit.js";
import { chunkWord } from "./chunkWord.js";
export function chunkLine({ data, line, options }) {
    const { newLineCharacter = "\n", wordSplitter = " " } = options ?? {};
    const currentChunk = data.currentChunk ?? "";
    const newLine = data.currentChunk !== undefined ? newLineCharacter : "";
    const maxChunkLength = data.maxChunkLength(data.currentIndex);
    if (currentChunk.length + newLine.length + line.length < maxChunkLength) {
        data.currentChunk = currentChunk + newLine + line;
        data.currentIndex = Math.max(data.currentIndex, 0);
    }
    else {
        if (data.currentChunk !== undefined) {
            data.currentIndex = data.chunks.push(data.currentChunk);
        }
        data.currentIndex = Math.max(data.currentIndex, 0);
        if (line.length < data.maxChunkLength(data.currentIndex)) {
            data.currentChunk = line;
        }
        else {
            data.currentChunk = "";
            const words = codeBlockSafeSplit(line, wordSplitter);
            words.forEach((word, wordIndex) => chunkWord({ data, options, word, wordIndex }));
            data.currentIndex = data.chunks.push(data.currentChunk);
            data.currentChunk = "";
        }
    }
}
