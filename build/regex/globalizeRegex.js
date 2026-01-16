export function globalizeRegex(regexp) {
    return new RegExp(regexp, regexp.flags.replace("g", "") + "g");
}
