import { navigateJson } from "@rpg-sage-creative/json-utils";
function findByKeyPath(args, key) {
    for (const arg of args) {
        const navResult = navigateJson(arg, key);
        if (navResult.isFull) {
            return navResult.value;
        }
    }
    return undefined;
}
const StringFormatRegExp = /\$\{[\w\.\[\]]+}|#\{\d+}/g;
export function stringFormat(template, ...args) {
    const pairs = new Map();
    return template.replace(StringFormatRegExp, keyMatch => {
        if (!pairs.has(keyMatch)) {
            const key = keyMatch.slice(2, -1);
            const value = keyMatch.startsWith("$")
                ? findByKeyPath(args, key)
                : args[+key];
            pairs.set(keyMatch, String(value ?? keyMatch));
        }
        return pairs.get(keyMatch);
    });
}
