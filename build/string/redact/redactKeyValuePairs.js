import { parseKeyValueArg } from "../../args/parseKeyValueArg.js";
import { KeyValueArgRegExpG } from "../../args/parseKeyValueArgs.js";
export function redactKeyValuePairs(content, redactedCharacter = "*") {
    if (!content)
        return content;
    return content.replace(KeyValueArgRegExpG, pair => {
        const kvPair = parseKeyValueArg(pair);
        const key = "".padEnd(kvPair.key.length, redactedCharacter);
        const value = "".padEnd(kvPair.value?.length ?? 0, redactedCharacter);
        const q = kvPair.isNaked ? '' : '"';
        return key + "=" + q + value + q;
    });
}
