import { getOrCreateRegex } from "../regex/getOrCreateRegex.js";
function createNumberRegex(options) {
    const { gFlag = "", iFlag = "" } = options ?? {};
    return new RegExp(`[\\-+]?\\d+(?:\\.\\d+)?`, gFlag + iFlag);
}
export function getNumberRegex(options) {
    return getOrCreateRegex(createNumberRegex, options);
}
