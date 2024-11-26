import { splitChars } from "./splitChars.js";
export function wrap(input, chars) {
    const leftRight = splitChars(chars);
    if (leftRight) {
        return `${leftRight.left}${input}${leftRight.right}`;
    }
    return input;
}
