export function quote(value, style = "double") {
    const char = style === "double" ? `"` : `'`;
    const escaped = value.replaceAll(char, `\\${char}`);
    return char + escaped + char;
}
