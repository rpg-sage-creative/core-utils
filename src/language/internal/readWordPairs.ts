import { readFile } from "./readFile.js";

/**
 * @internal
 * For reading word pairs, such as ukToUS.
 */
export function readWordPairs(filePath: string | undefined, orFileName: string): string[][] {
	const raw = readFile(filePath, orFileName);
	if (raw) {
		return raw.split("\n").map(line => line.split(",").map(word => word.trim()));
	}
	return [];
}