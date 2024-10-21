import { getAssertLabel } from "../AssertLabel.js";
import { getAssertMode } from "../AssertMode.js";

/** @internal Returns the correct prefix for logging based on the current AssertMode. */
export function getAssertPrefix(value: boolean): string | undefined {
	const tab = getAssertLabel() ? "  " : "";
	const indicator = value ? "pass" : "fail";
	const colorCode = value ? 32 : 31;
	const prefix = `\x1b[${colorCode}m${tab}assert-${indicator}::\x1b[0m`;
	const mode = getAssertMode();
	switch(mode) {
		case "pass": return value ? prefix : undefined;
		case "fail": return !value ? prefix : undefined;
		case "both": return prefix;
		default: return undefined;
	}
}