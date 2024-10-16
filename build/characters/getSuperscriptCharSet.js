export function getSuperscriptCharSet() {
    return {
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
