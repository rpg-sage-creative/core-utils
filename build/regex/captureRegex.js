import { rewrite } from "regex";
import { copyFlags } from "./internal/copyFlags.js";
export function captureRegex(regexp, captureGroup) {
    const source = `(?<${captureGroup}>${regexp.source})`;
    const options = { flags: copyFlags(regexp) };
    const { expression, flags } = rewrite(source, options);
    return new RegExp(expression, flags);
}
