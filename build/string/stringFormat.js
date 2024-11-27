function findNamedKey(args, key) {
    const keyParts = key.split(".");
    for (const arg of args) {
        const value = keyParts.reduce((value, key) => value?.[key], arg);
        if (value !== undefined) {
            return value;
        }
    }
    return undefined;
}
export function stringFormat(template, ...args) {
    const pairs = new Map();
    return template.replace(/\$\{[\w\.\[\]]+}|#\{\d+}/g, keyMatch => {
        if (!pairs.has(keyMatch)) {
            const key = keyMatch.slice(2, -1);
            const value = keyMatch.startsWith("$")
                ? findNamedKey(args, key)
                : String(args[+key]);
            pairs.set(keyMatch, value ?? keyMatch);
        }
        return pairs.get(keyMatch);
    });
}
