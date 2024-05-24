import { getFromProcessArgv } from "./getFromProcessArgv.js";
import { getFromProcessEnv } from "./getFromProcessEnv.js";
import { logAndReturn } from "./logAndReturn.js";
export function getFromProcess(test, ...keys) {
    for (const key of keys) {
        const envValue = getFromProcessEnv(key);
        if (test(envValue)) {
            return logAndReturn(key, envValue);
        }
        const argValue = getFromProcessArgv(key);
        if (test(argValue)) {
            return logAndReturn(key, argValue);
        }
    }
    throw new Error(`Environment Variable Missing: ${keys}`);
}
