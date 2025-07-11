import { dequote } from "../string/index.js";
import { getIncrementArgRegex } from "./getIncrementArgRegex.js";
export function parseIncrementArg(arg, options) {
    const regex = getIncrementArgRegex(options);
    const match = regex.exec(arg);
    if (match) {
        const [_, key, incrementer, modifier, value] = match;
        const keyRegex = new RegExp(`^${key}$`, "i");
        if (incrementer) {
            return { arg, index: -1, isIncrement: true, key, keyRegex, operator: incrementer[0], value: "1" };
        }
        return { arg, index: -1, isIncrement: true, key, keyRegex, operator: modifier[0], value: dequote(value) };
    }
    return undefined;
}
