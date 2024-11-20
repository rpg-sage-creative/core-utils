import { getSubscriptCharSet } from "../characters/getSubscriptCharSet.js";
import { toScriptedNumber } from "./internal/toScriptedNumber.js";
export function toSubscript(value) {
    return toScriptedNumber(value, getSubscriptCharSet());
}
