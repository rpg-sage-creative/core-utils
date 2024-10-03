export function omit(object, ...omittedKeys) {
    const out = {};
    const keys = Object.keys(object);
    keys.forEach(key => {
        if (!omittedKeys.includes(key)) {
            out[key] = object[key];
        }
    });
    return out;
}
