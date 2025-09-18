import { getKeyValueArgRegex } from "../../args/getKeyValueArgRegex.js";
import { parseKeyValueArg } from "../../args/parseKeyValueArg.js";
export function redactKeyValuePairs(content, redactedCharacter = "*") {
    if (!content)
        return content;
    const regexp = getKeyValueArgRegex({ allowDashes: true, allowPeriods: true, gFlag: "g" });
    return content.replace(regexp, pair => {
        const kvPair = parseKeyValueArg(pair, { allowDashes: true, allowPeriods: true });
        const key = "".padEnd(kvPair.key.length, redactedCharacter);
        const value = "".padEnd(kvPair.value?.length ?? 0, redactedCharacter);
        return `${key}="${value}"`;
    });
}
