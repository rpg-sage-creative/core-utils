/** @internal Removes the v, u, x, and n flags from the RegExp before feeding flags to regex(flags)`` */
export function copyFlags(regexp: RegExp): string {
	return regexp.flags.replace(/[vuxn]/g, "");
}