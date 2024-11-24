import { rewrite } from "regex";
import { copyFlags } from "./internal/copyFlags.js";
export function anchorRegex(regexp) {
    const source = `^(?:${regexp.source})$`;
    const options = { flags: copyFlags(regexp) };
    const { expression, flags } = rewrite(source, options);
    return new RegExp(expression, flags);
}
