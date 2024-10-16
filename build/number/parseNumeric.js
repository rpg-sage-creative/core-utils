import { getSubscriptCharSet } from "../characters/getSubscriptCharSet.js";
import { getSuperscriptCharSet } from "../characters/getSuperscriptCharSet.js";
import { getNumberRegex } from "./getNumberRegex.js";
function _parseNumber(value) {
    const regex = getNumberRegex({ anchored: true });
    if (!regex.test(value))
        return NaN;
    if (/^-?\d+$/.test(value)) {
        const length = value.replace(/^-/, "").length;
        if (length < 16)
            return Number(value);
        if (length > 16)
            return BigInt(value);
        const big = BigInt(value);
        if (big > Number.MAX_SAFE_INTEGER)
            return big;
        if (big < Number.MIN_SAFE_INTEGER)
            return big;
        return Number(value);
    }
    return Number(value);
}
function parseNumber(stringValue) {
    const numericValue = _parseNumber(stringValue);
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
function findCharSet(value) {
    const getters = [getSuperscriptCharSet, getSubscriptCharSet];
    for (const getter of getters) {
        const charSet = getter();
        if (charSet.numberRegex.test(value)) {
            return charSet;
        }
    }
    return undefined;
}
function scriptedToUnscripted(value) {
    const chars = value.split("");
    const charSet = findCharSet(value);
    if (!charSet)
        return undefined;
    let stringValue = "";
    for (const char of chars) {
        if (char === charSet.period) {
            if (stringValue.includes("."))
                return undefined;
            stringValue += ".";
        }
        else if (char === charSet.plus) {
            if (stringValue.length)
                return undefined;
        }
        else if (char === charSet.minus) {
            if (stringValue.length)
                return undefined;
            stringValue = "-";
        }
        else {
            const index = charSet.numbers.indexOf(char);
            if (index < 0)
                return undefined;
            stringValue += "0123456789"[index];
        }
    }
    return { stringValue, charSet };
}
export function parseNumericString(value) {
    const numberRegex = getNumberRegex({ anchored: true });
    let charSetType;
    let stringValue = value;
    if (!numberRegex.test(value)) {
        const unscriptedResults = scriptedToUnscripted(value);
        if (unscriptedResults) {
            charSetType = unscriptedResults.charSet.type;
            stringValue = unscriptedResults.stringValue;
        }
    }
    const parsedNumber = parseNumber(stringValue);
    const type = [charSetType, parsedNumber.isBigInt ? "bigint" : "number"].filter(s => s).join("-");
    return { ...parsedNumber, type, value };
}
export function parseNumeric(value) {
    return parseNumericString(value).numericValue;
}
