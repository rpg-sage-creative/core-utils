import { parseScriptedNumber } from "../internal/parseScriptedNumber.js";
import { getSubscriptCharacters } from "./getSubscriptCharacters.js";
export function parseSubscript(value) {
    return parseScriptedNumber(value, getSubscriptCharacters())?.numericValue ?? NaN;
}
