import { parseKeyValueArg } from "../../args/parseKeyValueArg.js";
export function getFromProcessArgv(key) {
    for (const arg of process.argv) {
        const pair = parseKeyValueArg(arg);
        if (pair?.key === key && pair?.value) {
            return pair.value;
        }
    }
    return undefined;
}
