import { getSubscriptCharacters } from "./getSubscriptCharacters.js";
export function toSubscript(value) {
    const characters = getSubscriptCharacters();
    const mapper = (char) => {
        switch (char) {
            case ".": return characters[10];
            case "-": return characters[12];
            default: return characters[+char];
        }
    };
    return String(value).split("").map(mapper).join("");
}
