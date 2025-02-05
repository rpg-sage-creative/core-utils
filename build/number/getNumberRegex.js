import { getOrCreateRegex } from "../regex/getOrCreateRegex.js";
function createNumberRegex(options) {
    const { gFlag = "", iFlag = "", sign = "optional", type = "optional" } = options ?? {};
    const signPart = { none: "", optional: "[\\-+]?", required: "[\\-+]" }[sign];
    const integerPart = { decimal: "", integer: "(?<!\\d+\\.\\d*)", optional: "" }[type];
    const decimalPart = { decimal: "(?:\\.\\d+)", integer: "(?!\\.\\d)", optional: "(?:\\.\\d+)?" }[type];
    return new RegExp(`${signPart}${integerPart}\\d+${decimalPart}`, gFlag + iFlag);
}
export function getNumberRegex(options) {
    return getOrCreateRegex(createNumberRegex, options);
}
