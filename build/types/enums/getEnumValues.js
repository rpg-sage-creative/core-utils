export function getEnumValues(_enum) {
    return Object.values(_enum)
        .filter(value => typeof (value) === "number");
}
