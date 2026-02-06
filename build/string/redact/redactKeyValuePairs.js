import { parseKeyValueArg } from "../../args/parseKeyValueArg.js";
import { KeyValueArgRegExpG } from "../../args/parseKeyValueArgs.js";
export function redactKeyValuePairs(content, charOrOpts) {
    if (!content)
        return content;
    const { char = "*", complete, keyChar = char, punctuationChar = char, valueChar = char } = typeof (charOrOpts) === "string"
        ? { char: charOrOpts }
        : charOrOpts ?? {};
    const [rEquals, rQuote] = complete ? "".padEnd(2, punctuationChar) : '="';
    return content.replace(KeyValueArgRegExpG, pair => {
        const { key, value, isNaked } = parseKeyValueArg(pair);
        const rKey = "".padEnd(key.length, keyChar);
        const rValue = "".padEnd(value?.length ?? 0, valueChar);
        if (isNaked) {
            return rKey + rEquals + rValue;
        }
        return rKey + rEquals + rQuote + rValue + rQuote;
    });
}
