function isFunctionOrNumber(arg) {
    const type = typeof (arg);
    return type === "function" || type === "number";
}
export function parseChunkOptions(argOne, argTwo) {
    if (isFunctionOrNumber(argOne)) {
        return {
            lineSplitter: argTwo?.lineSplitter ?? "\n",
            maxChunkLength: argTwo?.maxChunkLength ?? argOne,
            newLineCharacter: argTwo?.newLineCharacter ?? "\n",
            spaceCharacter: argTwo?.spaceCharacter ?? " ",
            wordSplitter: argTwo?.wordSplitter ?? " "
        };
    }
    return {
        lineSplitter: argTwo?.lineSplitter ?? argOne?.lineSplitter ?? "\n",
        maxChunkLength: argTwo?.maxChunkLength ?? argOne?.maxChunkLength,
        newLineCharacter: argTwo?.newLineCharacter ?? argOne?.newLineCharacter ?? "\n",
        wordSplitter: argTwo?.wordSplitter ?? argOne?.wordSplitter ?? " ",
        spaceCharacter: argTwo?.spaceCharacter ?? argOne?.spaceCharacter ?? " "
    };
}
