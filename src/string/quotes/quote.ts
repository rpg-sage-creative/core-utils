/**
 * Puts quotes around a value.
 * If the quotes used are in the value, they are escaped.
 * Default style: "double"
 */
export function quote(value: string, style: "double" | "single" = "double"): string {
	const char = style === "double" ? `"` : `'`;
	const escaped = value.replaceAll(char, `\\${char}`);
	return char + escaped + char;
}