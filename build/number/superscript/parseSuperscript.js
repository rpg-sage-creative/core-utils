import { parseScriptedNumber } from "../internal/parseScriptedNumber.js";
import { getSuperscriptCharacters } from "./getSuperscriptCharacters.js";
export function parseSuperscript(value) {
    return parseScriptedNumber(value, getSuperscriptCharacters())?.numericValue ?? NaN;
}
