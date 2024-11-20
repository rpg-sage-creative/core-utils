import { wrapRegex } from "./wrapRegex.js";

/**
 * Returns RegExp that is properly wrapped in spoilers as indicated by the given options.
 * Convenience for: wrapRegex(regexp, "||||", spoilers)
 */
export function spoilerRegex(regexp: RegExp, spoilers: "optional" | true) {
	return wrapRegex(regexp, "||||", spoilers);
}