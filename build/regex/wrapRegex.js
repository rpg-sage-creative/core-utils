import { regex } from "regex";
import { splitChars } from "../string/wrap/splitChars.js";
import { copyFlags } from "./internal/copyFlags.js";
export function wrapRegex(regexp, chars, required) {
    const { left, right } = splitChars(chars);
    const flags = copyFlags(regexp);
    const wrappedRegex = regex(flags) `${left} ${regexp} ${right}`;
    if (required === "optional") {
        return regex(flags) `${wrappedRegex} | ${regexp}`;
    }
    return wrappedRegex;
}
