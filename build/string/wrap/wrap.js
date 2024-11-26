import { splitChars } from "./splitChars.js";
export function wrap(input, chars) {
    if (input && chars?.length) {
        const { left, right } = splitChars(chars);
        return `${left}${input}${right}`;
    }
    return input;
}
