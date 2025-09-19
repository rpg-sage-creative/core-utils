import { getOrCreateRegex } from "../../regex/getOrCreateRegex.js";
function createSource(ticks) {
    return `(?<ticks${ticks}>(?:(?<!\\\\)\`){${ticks}})(?<content${ticks}>(?:.|\n)*?)(?:(?:(?<!\\\\)\`){${ticks}})`;
}
function createCodeBlockRegex({ gFlag = "", iFlag = "", ticks } = {}) {
    if (ticks) {
        return new RegExp(createSource(ticks), gFlag + iFlag);
    }
    const sources = [
        createSource(3),
        createSource(2),
        createSource(1)
    ];
    return new RegExp(`(?:${sources.join("|")})`, gFlag + iFlag);
}
export function getCodeBlockRegex(options) {
    return getOrCreateRegex(createCodeBlockRegex, options);
}
