import { parseNumber } from "./parseNumber.js";
export function parseScriptedNumber(value, characters) {
    const regularNumbers = "0123456789";
    const period = characters[11];
    const numbers = characters.slice(0, 10);
    let stringValue = "";
    const chars = value.split("");
    for (const char of chars) {
        if (char === period) {
            if (stringValue.includes("."))
                return undefined;
            stringValue += ".";
        }
        else {
            const index = numbers.indexOf(char);
            if (index < 0)
                return undefined;
            stringValue += regularNumbers[index];
        }
    }
    const parsedNumber = parseNumber(stringValue);
    return { ...parsedNumber, value };
}
