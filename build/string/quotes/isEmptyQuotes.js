import { getQuotePairs } from "./getQuotePairs.js";
export function isEmptyQuotes(value, style) {
    return getQuotePairs(style).some(pair => pair.chars === value);
}
