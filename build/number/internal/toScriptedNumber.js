export function toScriptedNumber(value, characters) {
    const mapper = (char) => {
        switch (char) {
            case ".": return characters.period;
            case "-": return characters.minus;
            default: return characters.numbers[+char];
        }
    };
    return String(value).split("").map(mapper).join("");
}
