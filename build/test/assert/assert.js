import { isDate } from "util/types";
import { stringify as jsonStringify } from "../../json/index.js";
import { isNullOrUndefined } from "../../types/index.js";
import { incrementAssertData } from "./AssertData.js";
import { getAssertLabel } from "./AssertLabel.js";
import { getAssertMode } from "./AssertMode.js";
function stringify(value) {
    if (isNullOrUndefined(value)) {
        return String(value);
    }
    return typeof (value) === "function"
        ? `function ${value.name || "/lambda/"}`
        : jsonStringify(value);
}
function getAssertPrefix(value) {
    const tab = getAssertLabel() ? "  " : "";
    const indicator = value ? "pass" : "fail";
    const colorCode = value ? 32 : 31;
    const prefix = `\x1b[${colorCode}m${tab}assert-${indicator}::\x1b[0m`;
    const mode = getAssertMode();
    switch (mode) {
        case "pass": return value ? prefix : undefined;
        case "fail": return !value ? prefix : undefined;
        case "both": return prefix;
        default: return undefined;
    }
}
function compareValues(expected, actual) {
    if (expected === actual) {
        return true;
    }
    if (isDate(expected) && isDate(actual)) {
        return expected.getTime() === actual.getTime();
    }
    if (Array.isArray(expected) && Array.isArray(actual)) {
        if (expected.length !== actual.length) {
            return false;
        }
        return expected.every((v, i) => compareValues(v, actual[i]));
    }
    if (typeof (expected) === "object" && typeof (actual) === "object") {
        return jsonStringify(expected) === jsonStringify(actual);
    }
    if (isNaN(expected) && isNaN(actual)) {
        return true;
    }
    return false;
}
function _assert(expectedValue, fnName, actualValue, args) {
    const compareResults = compareValues(expectedValue, actualValue);
    incrementAssertData(compareResults);
    const assertLabel = getAssertPrefix(compareResults);
    if (assertLabel) {
        const argsString = args.map(arg => stringify(arg)).join(",");
        const actualString = stringify(actualValue);
        const expectedString = stringify(expectedValue);
        const output = `${fnName}(${argsString}) => ${actualString} !== ${expectedString}`;
        console.log(assertLabel, output);
    }
}
export function assert(..._args) {
    const callbackfn = typeof (_args[1]) === "function" ? _args[1] : null;
    if (callbackfn) {
        const args = _args.slice(2);
        const expectedValue = _args[0];
        const actualValue = callbackfn(...args);
        _assert(expectedValue, callbackfn.name || "/lambda/", actualValue, args);
    }
    else {
        const assertBool = _args[0];
        const args = _args.slice(1);
        incrementAssertData(assertBool);
        const assertLabel = getAssertPrefix(assertBool);
        if (assertLabel) {
            console.log(assertLabel, ...args);
        }
    }
}
export async function assertAsync(expectedValue, callbackfn, ...args) {
    const actualValue = await callbackfn(...args);
    _assert(expectedValue, callbackfn.name || "/lambda/", actualValue, args);
}
