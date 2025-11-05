import { AllCodeBlocksRegExpG } from "../codeBlocks/AllCodeBlocksRegExp.js";
export function redactCodeBlocks(content, redactedCharacter = "*") {
    return content.replaceAll(AllCodeBlocksRegExpG, (...args) => {
        const { ticks, content } = args[args.length - 1];
        return ticks + "".padEnd(content.length, redactedCharacter) + ticks;
    });
}
