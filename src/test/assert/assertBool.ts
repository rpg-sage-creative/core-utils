import { incrementAssertData } from "./AssertData.js";
import { getAssertPrefix } from "./internal/getAssertPrefix.js";

/**
 * A passthrough for console.assert that allows tracking AssertData and
 */
export function assertBool(expectedValue: boolean, ...args: any[]): void {
	incrementAssertData(expectedValue);
	const assertLabel = getAssertPrefix(expectedValue);
	if (assertLabel) {
		console.log(assertLabel, ...args);
	}
}
