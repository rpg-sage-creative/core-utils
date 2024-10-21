import { assertFunc } from "./internal/assertFunc.js";
export function assertSync(expectedValue, callbackfn, ...args) {
    const actualValue = callbackfn(...args);
    assertFunc(expectedValue, callbackfn.name || "/lambda/", actualValue, args);
}
