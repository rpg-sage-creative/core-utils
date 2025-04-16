import { getFromProcessArgv } from "./internal/getFromProcessArgv.js";
import { getFromProcessEnv } from "./internal/getFromProcessEnv.js";
import { logAndReturn } from "./internal/logAndReturn.js";
export function getFromProcessSafely(test, ...keys) {
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
    return undefined;
}
