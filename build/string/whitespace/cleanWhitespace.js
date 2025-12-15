import { HorizontalWhitespaceRegExpG, WhitespaceRegExpG } from "./consts.js";
export function cleanWhitespace(value, options) {
    if (!value)
        return value;
    const { horizontalOnly, replacement = " " } = options ?? {};
    const regexp = horizontalOnly ? HorizontalWhitespaceRegExpG : WhitespaceRegExpG;
    return value.replace(regexp, replacement).trim();
}
