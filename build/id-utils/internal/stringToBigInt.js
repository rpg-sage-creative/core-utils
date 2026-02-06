export function stringToBigInt(value, radix) {
    let size = 10, factor = BigInt(radix ** size), i = value.length % size || size, parts = [value.slice(0, i)];
    while (i < value.length)
        parts.push(value.slice(i, i += size));
    return parts.reduce((r, v) => r * factor + BigInt(parseInt(v, radix)), 0n);
}
