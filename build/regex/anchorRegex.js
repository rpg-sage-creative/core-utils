import { pattern, regex } from "regex";
import { copyFlags } from "./internal/copyFlags.js";
export function anchorRegex(regexp) {
    const flags = copyFlags(regexp);
    const source = pattern(regexp.source);
    return regex(flags) `^${source}$`;
}
