/** Converts a string with a number of the given radix to a bigint. */
export function stringToBigInt(value: string, radix: number): bigint {
	let size = 10,
		factor = BigInt(radix ** size),
		i = value.length % size || size,
		parts = [value.slice(0, i)];
	while (i < value.length) parts.push(value.slice(i, i += size));
	return parts.reduce((r, v) => r * factor + BigInt(parseInt(v, radix)), 0n);
}