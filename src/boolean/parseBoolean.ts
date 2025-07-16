/** Converts known /true/ values (true, 1, "true", "1", "yes") and /false/ values (false, 0, "false", "0", "no") to their boolean equivalent. */
export function parseBoolean(value: unknown): boolean | undefined {
	if (value === true || value === 1 || value === "true" || value === "1" || value === "yes") return true;
	if (value === false || value === 0 || value === "false" || value === "0" || value === "no") return false;
	return undefined;
}