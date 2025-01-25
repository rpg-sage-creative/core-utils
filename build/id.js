export function compressId(value, radix = 36) {
    if (value) {
        if (value.includes("-")) {
            return value.split("-").map(s => compressId(decompressId(s, 16), radix)).join("-");
        }
        return BigInt(value).toString(radix);
    }
    return undefined;
}
export function decompressId(value, radix = 36) {
    if (value) {
        if (value.includes("-")) {
            const lengths = [8, 4, 4, 4, 12];
            return value.split("-").map((s, i) => compressId(decompressId(s, radix), 16).padStart(lengths[i], "0")).join("-");
        }
        else {
            return value === "0"
                ? "0".padEnd(16, "0")
                : stringToBigInt(value, radix).toString();
        }
    }
    return undefined;
}
export function stringToBigInt(value, radix) {
    let size = 10, factor = BigInt(radix ** size), i = value.length % size || size, parts = [value.slice(0, i)];
    while (i < value.length)
        parts.push(value.slice(i, i += size));
    return parts.reduce((r, v) => r * factor + BigInt(parseInt(v, radix)), 0n);
}
