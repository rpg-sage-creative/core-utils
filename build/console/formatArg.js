import { stringifyJson } from "@rpg-sage-creative/json-utils";
import { isErrorLike } from "../types/typeGuards/isErrorLike.js";
export function formatArg(arg) {
    if (isErrorLike(arg)) {
        const message = [arg.name, arg.message].filter(s => s).join(": ");
        return [message, arg.stack].filter(s => s).join("\n");
    }
    const asString = String(arg);
    if (!asString.startsWith("[object")) {
        return asString;
    }
    return stringifyJson(arg);
}
