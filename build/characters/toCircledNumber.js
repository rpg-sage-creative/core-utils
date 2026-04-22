import { typeError } from "@rsc-utils/type-utils";
import { numberOrUndefined } from "../number/numberOrUndefined.js";
function processDouble(value, { dingbat, negative }) {
    if (dingbat || negative || value < 1 || value > 10) {
        return "";
    }
    const codePoint = 9461;
    const delta = value - 1;
    return String.fromCodePoint(codePoint + delta);
}
function processDingbat(value, negative) {
    if (value < 0 || value > 10) {
        return "";
    }
    let delta;
    let codePoint;
    if (value === 0) {
        codePoint = negative
            ? 127244
            : 127243;
        delta = 0;
    }
    else {
        codePoint = negative
            ? 10122
            : 10112;
        delta = value - 1;
    }
    return String.fromCodePoint(codePoint + delta);
}
function processNegative(value) {
    if (value < 0 || value > 20) {
        return "";
    }
    let delta;
    let codePoint;
    if (value === 0) {
        codePoint = 9471;
        delta = 0;
    }
    else if (value < 11) {
        codePoint = 10102;
        delta = value - 1;
    }
    else {
        codePoint = 9451;
        delta = value - 11;
    }
    return String.fromCodePoint(codePoint + delta);
}
function process(value) {
    let delta;
    let codePoint;
    if (value === 0) {
        codePoint = 9450;
        delta = 0;
    }
    else if (value < 21) {
        codePoint = 9312;
        delta = value - 1;
    }
    else if (value < 36) {
        codePoint = 12881;
        delta = value - 21;
    }
    else {
        codePoint = 12977;
        delta = value - 36;
    }
    return String.fromCodePoint(codePoint + delta);
}
export function toCircledNumber(value, options) {
    const number = numberOrUndefined(value);
    if (number === undefined) {
        throw typeError({
            argKey: "value",
            mustBe: "a number or string value that can be coerced to a number",
            value
        });
    }
    if (number < 0 || number > 50)
        return "";
    const dingbat = options?.dingbat === true;
    const negative = options?.negative === true;
    if (options?.double === true) {
        return processDouble(number, { dingbat, negative });
    }
    if (dingbat) {
        return processDingbat(number, negative);
    }
    if (negative) {
        return processNegative(number);
    }
    return process(number);
}
