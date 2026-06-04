import { splitWrapChars } from "./splitWrapChars.js";
export function wrap(input, chars) {
    if (input && chars?.length) {
        const { left, right } = splitWrapChars(chars);
        return left + input + right;
    }
    return input;
}
