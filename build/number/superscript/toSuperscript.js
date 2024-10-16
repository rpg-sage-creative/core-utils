import { getSuperscriptCharacters } from "./getSuperscriptCharacters.js";
export function toSuperscript(value) {
    const characters = getSuperscriptCharacters();
    return String(value)
        .split("")
        .map(char => char === "." ? characters[11] : characters[+char])
        .join("");
}
