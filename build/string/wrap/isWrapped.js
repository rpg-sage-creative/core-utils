import { splitChars } from "./splitChars.js";
export function isWrapped(input, chars) {
    if (input && chars?.length) {
        const { left, right } = splitChars(chars);
        return input.length > left.length + right.length
            && input.startsWith(left)
            && input.endsWith(right);
    }
    return false;
}
