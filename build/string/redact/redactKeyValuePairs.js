import { getKeyValueArgRegex } from "../../args/getKeyValueArgRegex.js";
export function redactKeyValuePairs(content) {
    if (!content)
        return content;
    const regexp = getKeyValueArgRegex({ allowDashes: true, allowPeriods: true });
    return content.replace(regexp, pair => "".padEnd(pair.length, "*"));
}
