import { isPromise } from "util/types";
import { enableColorLevels } from "../console/colors/enableColorLevels.js";
import { error } from "../console/loggers/error.js";
import { info } from "../console/loggers/info.js";
import { enableLogLevels } from "../console/logLevels/enableLogLevels.js";
import { getAssertData } from "./assert/AssertData.js";
import { startAsserting, stopAsserting } from "./assert/AssertLabel.js";
function showSummary(ex) {
    if (ex) {
        error(ex);
    }
    info();
    info(getAssertData());
    if (ex) {
        process.exit(1);
    }
}
async function runTest(fn, exitOnFail) {
    try {
        const res = fn();
        if (isPromise(res)) {
            res.catch(showSummary);
        }
        await res;
    }
    catch (ex) {
        showSummary(ex);
    }
    if (exitOnFail && getAssertData()?.failed) {
        process.exit(1);
    }
}
export async function runTests(...args) {
    const exitOnFail = args.includes(true);
    const tests = args.filter((arg) => typeof (arg) === "function");
    enableColorLevels("development");
    enableLogLevels("development");
    for (const test of tests) {
        startAsserting(test.name);
        await runTest(test, exitOnFail);
        stopAsserting();
    }
    showSummary();
}
