import { assertFunc } from "./internal/assertFunc.js";

/**
 * A convenience method for using console.assert.
 * The callback method is called with all the given args and compared to the expected value.
 * The output for a failure is created to show the function name, args, and result as well as the expected value.
 */
export async function assertAsync<T>(expectedValue: T, callbackfn: Function, ...args: any[]): Promise<void> {
	const actualValue = await callbackfn(...args);
	assertFunc(expectedValue, callbackfn.name || "/lambda/", actualValue, args);
}