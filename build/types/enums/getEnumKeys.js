export function getEnumKeys(_enum) {
    return Object.keys(_enum)
        .filter(key => typeof (_enum[key]) === "number");
}
