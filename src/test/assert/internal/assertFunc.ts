import { isDate } from "util/types";
import { stringifyJson } from "../../../json/stringifyJson.js";
import { isNullOrUndefined } from "../../../types/index.js";
import { incrementAssertData } from "../AssertData.js";
import { getAssertPrefix } from "./getAssertPrefix.js";

/** Quoting strings makes it easier to distinguish between null and "null". */
function stringify(value: any): string {
	if (isNullOrUndefined(value)) {
		return String(value);
	}
	return typeof(value) === "function"
		? `function ${value.name || "/lambda/"}`
		: stringifyJson(value);
}

/**
 * Compares the given values by checking types for date/array/object.
 * Dates are compared using getTime().
 * Arrays are compared recursively by checking length before iterating.
 * Objects are compared using JSON.stringify().
 */
function compareValues(expected: unknown, actual: unknown): boolean {
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
	if (typeof(expected) === "object" && typeof(actual) === "object") {
		return stringifyJson(expected) === stringifyJson(actual);
	}
	if (isNaN(expected as number) && isNaN(actual as number)) {
		return true;
	}
	return false;
}

/** @internal Processes the assert logic shared between assertSync and assertAsync. */
export function assertFunc(expectedValue: unknown, fnName: string, actualValue: unknown, args: unknown[]): void {
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
