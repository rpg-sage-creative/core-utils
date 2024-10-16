import { getSuperscriptCharacters } from "./getSuperscriptCharacters.js";
export function toSuperscript(value) {
    const characters = getSuperscriptCharacters();
    const mapper = (char) => {
        switch (char) {
            case ".": return characters[10];
            case "-": return characters[12];
            default: return characters[+char];
        }
    };
    return String(value).split("").map(mapper).join("");
}
