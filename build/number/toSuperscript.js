import { getSuperscriptCharSet } from "../characters/getSuperscriptCharSet.js";
import { toScriptedNumber } from "./internal/toScriptedNumber.js";
export function toSuperscript(value) {
    return toScriptedNumber(value, getSuperscriptCharSet());
}
