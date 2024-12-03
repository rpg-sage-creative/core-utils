import { getOrCreateRegex } from "../regex/getOrCreateRegex.js";
function createWordCharacterRegex(options) {
    const { allowDashes, allowPeriods, gFlag = "", iFlag = "" } = options ?? {};
    const dash = allowDashes ? "\\-" : "";
    const period = allowPeriods ? "\\." : "";
    return new RegExp(`[\\w\\p{L}\\p{N}${dash}${period}]`, gFlag + iFlag + "u");
}
export function getWordCharacterRegex(options) {
    return getOrCreateRegex(createWordCharacterRegex, options);
}
