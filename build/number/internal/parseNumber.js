import { parseNumeric } from "../numeric/parseNumeric.js";
export function parseNumber(stringValue) {
    const numericValue = parseNumeric(stringValue);
    if (typeof (numericValue) === "bigint") {
        return {
            isBigInt: true,
            isNaN: false,
            isNumber: false,
            numericValue,
            stringValue
        };
    }
    const nan = isNaN(numericValue);
    return {
        isBigInt: false,
        isNaN: nan,
        isNumber: !nan,
        numericValue,
        stringValue
    };
}
