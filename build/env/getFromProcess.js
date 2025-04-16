import { getFromProcessSafely } from "./getFromProcessSafely.js";
export function getFromProcess(test, ...keys) {
    const value = getFromProcessSafely(test, ...keys);
    if (value !== undefined) {
        return value;
    }
    throw new Error(`Environment Variable Missing: ${keys}`);
}
