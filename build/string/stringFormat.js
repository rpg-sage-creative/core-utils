import { navigateJson } from "../json/navigateJson.js";
function findByKeyPath(args, key) {
    const navResults = args.map(arg => navigateJson(arg, key));
    for (const navResult of navResults) {
        if (navResult.isFull) {
            return navResult.value;
        }
    }
    return undefined;
}
let stringFormatRegex;
export function stringFormat(template, ...args) {
    stringFormatRegex ??= /\$\{[\w\.\[\]]+}|#\{\d+}/g;
    const pairs = new Map();
    return template.replace(stringFormatRegex, keyMatch => {
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
