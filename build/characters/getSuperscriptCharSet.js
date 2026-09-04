let superscriptCharSet;
/** Returns an object with superscript characters. */
export function getSuperscriptCharSet() {
    return superscriptCharSet ??= {
        equals: "⁼",
        minus: "⁻",
        numbers: ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"],
        period: "\u22C5",
        plus: "⁺",
        parentheses: ["⁽", "⁾"],
        numberRegex: /^[⁺⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+(\u22C5[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?$/,
        type: "super"
    };
}
