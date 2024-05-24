import { parse } from "./bigint/parse.js";
import { stringify } from "./bigint/stringify.js";
export function cloneJson(object) {
    if (object === undefined) {
        throw new SyntaxError(`JSON Parse error: Unexpected identifier "undefined"`);
    }
    return parse(stringify(object));
}
