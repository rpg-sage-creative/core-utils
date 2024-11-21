import { chunkWord } from "./chunkWord.js";
export function chunkLine(data, options, line, _lineIndex) {
    const currentChunk = data.currentChunk ?? "";
    const newLine = data.currentChunk !== undefined ? options.newLineCharacter : "";
    if (currentChunk.length + newLine.length + line.length < data.maxChunkLength(data.currentIndex)) {
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
            const words = line.split(options.wordSplitter);
            words.forEach((word, wordIndex) => chunkWord(data, options, word, wordIndex));
            data.currentIndex = data.chunks.push(data.currentChunk);
            data.currentChunk = "";
        }
    }
}
