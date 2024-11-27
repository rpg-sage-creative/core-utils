import { regex } from "regex";
import { copyFlags } from "./internal/copyFlags.js";
export function captureRegex(regexp, captureGroup) {
    return regex(copyFlags(regexp)) `(?<${captureGroup}>${regexp})`;
}
