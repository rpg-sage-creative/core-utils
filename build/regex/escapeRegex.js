export function escapeRegex(value) {
    return value.split("").map((char, index) => {
        if (!index && /[0-9a-zA-Z]/.test(char) || ",-=<>#&!%:;@~'`\" ".includes(char)) {
            return `\\x${char.charCodeAt(0).toString(16)}`;
        }
        if ("^$\\.*+?()[]{}|/".includes(char)) {
            return `\\${char}`;
        }
        if (char === "\f")
            return "\\f";
        if (char === "\n")
            return "\\n";
        if (char === "\r")
            return "\\r";
        if (char === "\t")
            return "\\t";
        if (char === "\v")
            return "\\v";
        return char;
    }).join("");
}
