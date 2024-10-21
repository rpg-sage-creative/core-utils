import { isDate } from "util/types";
import { stringify as jsonStringify } from "../../../json/index.js";
import { isNullOrUndefined } from "../../../types/index.js";
import { incrementAssertData } from "../AssertData.js";
import { getAssertPrefix } from "./getAssertPrefix.js";
function stringify(value) {
    if (isNullOrUndefined(value)) {
        return String(value);
    }
    return typeof (value) === "function"
        ? `function ${value.name || "/lambda/"}`
        : jsonStringify(value);
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
export function assertFunc(expectedValue, fnName, actualValue, args) {
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
