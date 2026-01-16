export function globalizeRegex(regexp) {
    let { flags } = regexp;
    if (!flags.includes("g"))
        flags += "g";
    return new RegExp(regexp, flags);
}
