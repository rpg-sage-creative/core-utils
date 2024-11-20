import { regex, rewrite } from "regex";
import { splitChars } from "../string/wrap/splitChars.js";
import { copyFlags } from "./internal/copyFlags.js";
export function wrapRegex(regexp, chars, required) {
    const leftRight = splitChars(chars);
    const left = regex `${leftRight.left}`.source;
    const right = regex `${leftRight.right}`.source;
    const groupedSource = `(?:${regexp.source})`;
    const wrappedSource = `${left} ${groupedSource} ${right}`;
    const options = { flags: copyFlags(regexp) };
    if (required === "optional") {
        const { expression, flags } = rewrite(`${wrappedSource} | ${groupedSource}`, options);
        return new RegExp(expression, flags);
    }
    const { expression, flags } = rewrite(wrappedSource, options);
    return new RegExp(expression, flags);
}
