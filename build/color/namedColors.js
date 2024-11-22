let _namedColors;
export function getNamedColors() {
    if (!_namedColors) {
        _namedColors = new Map();
    }
    return _namedColors;
}
export function getNamedColor(key) {
    return key ? _namedColors?.get(key) : undefined;
}
export function hasNamedColor(key) {
    return key ? _namedColors?.has(key) ?? false : false;
}
