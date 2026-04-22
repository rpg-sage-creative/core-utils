import { rangeError } from "@rsc-utils/type-utils";
export function toCircledLetter(value, options) {
    const charCode = value.charCodeAt(0);
    const isUpper = 64 < charCode && charCode < 91;
    const isLower = 96 < charCode && charCode < 123;
    if (!isUpper && !isLower) {
        throw rangeError({
            argKey: "letter",
            mustBe: "a letter from a-z or A-Z",
            value,
        });
    }
    const negative = options?.negative === true;
    let charDelta = 65;
    let circleA = negative
        ? 127312
        : 9398;
    if (charCode > 96) {
        if (negative)
            return "";
        circleA = 9424;
        charDelta = 97;
    }
    const circleDelta = charCode - charDelta;
    return String.fromCodePoint(circleA + circleDelta);
}
