export function chunkWord(data, options, word, wordIndex) {
    const currentChunk = data.currentChunk ?? "";
    const space = 0 < wordIndex ? options.spaceCharacter : "";
    if (currentChunk.length + space.length + word.length < data.maxChunkLength(data.currentIndex)) {
        data.currentChunk = currentChunk + space + word;
    }
    else {
        if (data.currentChunk !== undefined) {
            data.currentIndex = data.chunks.push(data.currentChunk);
        }
        data.currentIndex = Math.max(data.currentIndex, 0);
        data.currentChunk = space + word;
    }
}
