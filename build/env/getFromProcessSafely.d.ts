import type { Validator } from "./types.js";
/**
 * Attempts to get the environment variable by checking process and then args.
 * Each key is checked and then tested, in order, until a valid value is found.
 * If all values are checked an none pass the test, undefined is returned.
 * @param test the test to use when checking validity of the values
 * @param keys the keys to check, in order
 * @returns
 */
export declare function getFromProcessSafely<T>(test: Validator, ...keys: string[]): T | undefined;
