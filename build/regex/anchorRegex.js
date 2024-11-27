import { regex } from "regex";
import { copyFlags } from "./internal/copyFlags.js";
export function anchorRegex(regexp) {
    return regex(copyFlags(regexp)) `^${regexp}$`;
}
