function parseKeyValueArg(input, key) {
    const regex = new RegExp(`^${key}=("[^"]+"|'[^']+'|\\S+)$`, "i");
    if (regex.test(input)) {
        const value = input.slice(input.indexOf("=") + 1);
        if (/^("[^"]+"|'[^']+')$/.test(value)) {
            return value.slice(1, -1).trim();
        }
        return value;
    }
    return undefined;
}
export function getFromProcessArgv(key) {
    for (const arg of process.argv) {
        const value = parseKeyValueArg(arg, key);
        if (value) {
            return value;
        }
    }
    return undefined;
}
