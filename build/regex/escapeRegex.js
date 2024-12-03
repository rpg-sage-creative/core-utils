export function escapeRegex(value, options) {
    const global = "$()*+./?[]\\^{}|";
    const charClass = options?.charClass ? "-" : "";
    const vFlag = options?.charClass && options.vFlag ? "!#%&,:;<=>@`~" : "";
    const chars = global + charClass + vFlag;
    return value.split("").map(s => chars.includes(s) ? `\\${s}` : s).join("");
}
