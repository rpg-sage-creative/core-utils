import { assertBool } from "./assertBool.js";
import { assertSync } from "./assertSync.js";
export function assert(...args) {
    const handler = typeof (args[1]) === "function" ? assertSync : assertBool;
    handler(...args);
}
