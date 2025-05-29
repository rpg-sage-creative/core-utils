import { parseValidKeyValueArg } from "./internal/parseValidKeyValueArg.js";
import { isKeyValueArg } from "./isKeyValueArg.js";
export function parseKeyValueArg(input, options) {
    if (isKeyValueArg(input, options)) {
        return parseValidKeyValueArg(input);
    }
    return undefined;
}
