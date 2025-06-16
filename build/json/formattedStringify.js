import { isNullOrUndefined } from "../types/index.js";
import { stringifyJson } from "./stringifyJson.js";
export function formattedStringify(object, options = {}) {
    if (isNullOrUndefined(object)) {
        return String(object);
    }
    return stringifyJson(object, null, options?.insertSpaces ? options.tabSize ?? 4 : "\t", options.maxLineLength ?? 250);
}
