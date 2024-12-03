import { getOrCreateRegex } from "../../regex/getOrCreateRegex.js";
import { getQuotePairs } from "./getQuotePairs.js";
export function createQuotedRegexPart([left, right], quantifier) {
    return `${left}(?:[^${right}\\\\]|\\\\.)${quantifier}${right}`;
}
function createQuotedRegex(options) {
    const { gFlag = "", iFlag = "", contents = "+", style = "any" } = options ?? {};
    const flags = gFlag + iFlag;
    const leftChars = [];
    const rightChars = [];
    const parts = [];
    getQuotePairs(style).forEach(pair => {
        leftChars.push(pair.chars[0]);
        rightChars.push(pair.chars[1]);
        parts.push(createQuotedRegexPart(pair.chars, contents));
    });
    const quotedRegex = new RegExp(`(?<!\\\\)(?:${parts.join("|")})`, flags);
    const regexp = quotedRegex;
    regexp.leftChars = leftChars.join("");
    regexp.rightChars = rightChars.join("");
    return regexp;
}
export function getQuotedRegex(options) {
    let leftChars;
    let rightChars;
    const create = (options) => {
        const regexp = createQuotedRegex(options);
        leftChars = regexp.leftChars;
        rightChars = regexp.rightChars;
        return regexp;
    };
    const regexp = getOrCreateRegex(create, options);
    if (!regexp.leftChars && leftChars)
        regexp.leftChars = leftChars;
    if (!regexp.rightChars && rightChars)
        regexp.rightChars = rightChars;
    return regexp;
}
