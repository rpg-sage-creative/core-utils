import { parseNumber } from "./internal/parseNumber.js";
import { parseScriptedNumber } from "./internal/parseScriptedNumber.js";
import { getSuperscriptCharacters } from "./superscript/getSuperscriptCharacters.js";
export function parseNumberString(value) {
    if (/^bigint-\d+n$/.test(value)) {
        return {
            isBigInt: true,
            isNaN: false,
            isNumber: false,
            numericValue: BigInt(value.slice(7, -1)),
            stringValue: value,
            type: "bigint",
            value
        };
    }
    if (/[^\d\.-]/.test(value)) {
        const superResults = parseScriptedNumber(value, getSuperscriptCharacters());
        if (superResults) {
            if (superResults.isBigInt)
                return { ...superResults, type: "super-bigint" };
            if (superResults.isNumber)
                return { ...superResults, type: "super-number" };
            return undefined;
        }
        const subResults = parseScriptedNumber(value, getSuperscriptCharacters());
        if (subResults) {
            if (subResults.isBigInt)
                return { ...subResults, type: "sub-bigint" };
            if (subResults.isNumber)
                return { ...subResults, type: "sub-number" };
            return undefined;
        }
    }
    if (!/-?\d+(\.\d+)?/.test(value))
        return undefined;
    const parsedNumber = parseNumber(value);
    return {
        ...parsedNumber,
        type: parsedNumber.isBigInt ? "bigint" : "number",
        value
    };
}
