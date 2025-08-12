import { isWholeNumberString } from "../types/index.js";
export function isSnowflake(value) {
    return isWholeNumberString(value) && value.length >= 16;
}
