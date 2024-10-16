import { getSubscriptCharacters } from "./getSubscriptCharacters.js";
export function toSubscript(value) {
    const characters = getSubscriptCharacters();
    return String(value)
        .split("")
        .map(char => char === "." ? characters[11] : characters[+char])
        .join("");
}
