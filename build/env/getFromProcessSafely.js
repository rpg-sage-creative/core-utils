import { getFromEnvJson } from "./internal/getFromEnvJson.js";
import { getFromProcessArgv } from "./internal/getFromProcessArgv.js";
import { getFromProcessEnv } from "./internal/getFromProcessEnv.js";
import { logAndReturn } from "./internal/logAndReturn.js";
let _getFromEnvJson;
export function getFromProcessSafely(test, ...keys) {
    _getFromEnvJson ??= process.argv.includes("--getFromEnvJson");
    for (const key of keys) {
        const argValue = getFromProcessArgv(key);
        if (test(argValue)) {
            return logAndReturn("argv", key, argValue);
        }
        const envValue = getFromProcessEnv(key);
        if (test(envValue)) {
            return logAndReturn("env", key, envValue);
        }
        if (_getFromEnvJson) {
            const jsonValue = getFromEnvJson(key);
            if (test(jsonValue)) {
                return logAndReturn("json", key, jsonValue);
            }
        }
    }
    return undefined;
}
