export function quote(value, style = "double") {
    if (style === "smart" && value.includes('"')) {
        if (!value.includes('“') && !value.includes('”')) {
            return `“${value}”`;
        }
        if (!value.includes("'")) {
            return `'${value}'`;
        }
        if (!value.includes("‘") && !value.includes("’")) {
            return `‘${value}’`;
        }
    }
    const char = style === "single" ? `'` : `"`;
    const escaped = value.replaceAll(char, `\\${char}`);
    return char + escaped + char;
}
