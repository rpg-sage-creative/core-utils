import { assertFunc } from "./internal/assertFunc.js";
export async function assertAsync(expectedValue, callbackfn, ...args) {
    const actualValue = await callbackfn(...args);
    assertFunc(expectedValue, callbackfn.name || "/lambda/", actualValue, args);
}
