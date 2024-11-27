import { regex } from "regex";
import { copyFlags } from "./internal/copyFlags.js";

/**
 * Returns RegExp that is properly captured using the given options.
 * Because this uses the regex library, the resulting RegExp will include the "u" flag.
 */
export function captureRegex(regexp: RegExp, captureGroup: string): RegExp {
	return regex(copyFlags(regexp))`(?<${captureGroup}>${regexp})`;
}