import { incrementAssertData } from "./AssertData.js";
import { getAssertPrefix } from "./internal/getAssertPrefix.js";
export function assertBool(expectedValue, ...args) {
    incrementAssertData(expectedValue);
    const assertLabel = getAssertPrefix(expectedValue);
    if (assertLabel) {
        console.log(assertLabel, ...args);
    }
}
