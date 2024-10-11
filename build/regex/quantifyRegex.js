import { rewrite } from "regex";
import { copyFlags } from "./internal/copyFlags.js";
export function quantifyRegex(regexp, quantifier) {
    const source = `(?:${regexp.source})${quantifier}`;
    const options = { flags: copyFlags(regexp) };
    const { expression, flags } = rewrite(source, options);
    return new RegExp(expression, flags);
}
