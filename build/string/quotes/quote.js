export function quote(value, style) {
    const char = style === "single" ? `'` : `"`;
    const regexp = new RegExp(`[\\\\${char}]`, "g");
    const escaped = value.replace(regexp, `\\$&`);
    return char + escaped + char;
}
