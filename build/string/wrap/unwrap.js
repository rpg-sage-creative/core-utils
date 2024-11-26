import { splitChars } from "./splitChars.js";
export function unwrap(input, chars) {
    if (input && chars?.length) {
        const { left, right } = splitChars(chars);
        while (input.startsWith(left) && input.endsWith(right)) {
            input = input.slice(left.length, -right.length);
        }
    }
    return input;
}
