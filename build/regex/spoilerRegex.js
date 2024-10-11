import { regex, rewrite } from "regex";
import { copyFlags } from "./internal/copyFlags.js";
export function spoilerRegex(regexp, spoilers) {
    const pipes = regex `${"||"}`.source;
    const groupedSource = `(?:${regexp.source})`;
    const pipedSource = `${pipes} ${groupedSource} ${pipes}`;
    const options = { flags: copyFlags(regexp) };
    if (spoilers === "optional") {
        const { expression, flags } = rewrite(`${pipedSource} | ${groupedSource}`, options);
        return new RegExp(expression, flags);
    }
    const { expression, flags } = rewrite(pipedSource, options);
    return new RegExp(expression, flags);
}
