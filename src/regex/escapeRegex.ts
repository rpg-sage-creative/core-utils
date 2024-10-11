import { regex } from "regex";

/** Convenience for regex`${value}`.source; which is a replacement for XRegExp.esscape(value) */
export function escapeRegex(value: string): string {
	return regex`${value}`.source;
}