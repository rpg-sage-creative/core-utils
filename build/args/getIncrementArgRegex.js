import { getWordCharacterRegex } from "../characters/getWordCharacterRegex.js";
import { escapeRegex } from "../regex/escapeRegex.js";
import { getOrCreateRegex } from "../regex/getOrCreateRegex.js";
import { getQuotedRegex } from "../string/index.js";
function createIncrementArgRegex(options) {
    const { allowDashes, allowPeriods } = options ?? {};
    const keySource = options?.key ? escapeRegex(options.key) : getWordCharacterRegex({ allowDashes, allowPeriods, quantifier: "+" }).source;
    const modSource = `\\+=|\\-=`;
    const incrementerSource = `\\+{2}|\\-{2}`;
    const quotedSource = getQuotedRegex({ contents: "*" });
    return new RegExp(`(${keySource})(?:(${incrementerSource})|(${modSource})(${quotedSource}|\\S+))`, options?.iFlag);
}
export function getIncrementArgRegex(options) {
    return getOrCreateRegex(createIncrementArgRegex, options);
}
