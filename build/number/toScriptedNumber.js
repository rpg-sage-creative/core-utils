import { getSubscriptCharSet } from "../characters/getSubscriptCharSet.js";
import { getSuperscriptCharSet } from "../characters/getSuperscriptCharSet.js";
function toScriptedNumber(value, characters) {
    const mapper = (char) => {
        switch (char) {
            case ".": return characters.period;
            case "-": return characters.minus;
            default: return characters.numbers[+char];
        }
    };
    return String(value).split("").map(mapper).join("");
}
export function toSubscript(value) {
    return toScriptedNumber(value, getSubscriptCharSet());
}
export function toSuperscript(value) {
    return toScriptedNumber(value, getSuperscriptCharSet());
}
