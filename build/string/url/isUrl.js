import { getUrlRegex } from "./createUrlRegex.js";
export function isUrl(value) {
    return getUrlRegex({ anchored: true, wrapChars: "<>", wrapOptional: true }).test(value);
}
