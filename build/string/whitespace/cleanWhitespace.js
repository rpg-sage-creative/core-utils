import { getWhitespaceRegex } from "./getWhitespaceRegex.js";
export function cleanWhitespace(value, options) {
    if (!value)
        return value;
    const { horizontalOnly, replacement = " " } = options ?? {};
    const regexp = getWhitespaceRegex({ gFlag: "g", quantifier: "+", horizontalOnly });
    return value.replace(regexp, replacement).trim();
}
