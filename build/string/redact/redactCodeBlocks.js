import { AllCodeBlocksRegExpG } from "../codeBlocks/AllCodeBlocksRegExp.js";
export function redactCodeBlocks(content, charOrOpts) {
    if (!content)
        return content;
    const { char = "*", complete, contentChar = char, punctuationChar = char } = typeof (charOrOpts) === "string"
        ? { char: charOrOpts }
        : charOrOpts ?? {};
    return content.replaceAll(AllCodeBlocksRegExpG, (...args) => {
        const { ticks, content } = args[args.length - 1];
        const redactedTicks = complete ? "".padEnd(ticks.length, punctuationChar) : ticks;
        const redactedContent = "".padEnd(content.length, contentChar);
        return redactedTicks + redactedContent + redactedTicks;
    });
}
