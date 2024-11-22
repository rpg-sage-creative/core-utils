import { readFile } from "./readFile.js";
export function readWordPairs(filePath, orFileName) {
    const raw = readFile(filePath, orFileName);
    if (raw) {
        return raw.split("\n").map(line => line.split(",").map(word => word.trim()));
    }
    return [];
}
