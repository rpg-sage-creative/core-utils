import { typeError } from "@rsc-utils/type-utils";
export function splitWrapChars(chars) {
    if (!chars?.trim().length) {
        throw typeError({ argKey: "chars", mustBe: "a non-blank string", value: chars });
    }
    if (chars.length % 2 === 0) {
        const half = chars.length / 2;
        return {
            left: chars.slice(0, half),
            right: chars.slice(half)
        };
    }
    return {
        left: chars,
        right: chars.split("").reverse().join("")
    };
}
export const splitChars = splitWrapChars;
