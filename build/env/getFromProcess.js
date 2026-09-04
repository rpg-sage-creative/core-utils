import { getFromProcessSafely } from "./getFromProcessSafely.js";
/**
 * Attempts to get the environment variable by checking process and then args.
 * Each key is checked, and then tested.
 * If all values are checked an none pass the test, then an error is thrown.
 * @param test the test to use when checking validity of the values
 * @param keys the keys to check, in order
 * @returns
 */
export function getFromProcess(test, ...keys) {
    const value = getFromProcessSafely(test, ...keys);
    if (value !== undefined) {
        return value;
    }
    throw new Error(`Environment Variable Missing: ${keys}`);
}
