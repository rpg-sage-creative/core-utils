export function copyFlags(regexp) {
    return regexp.flags.replace(/[vuxn]/g, "");
}
