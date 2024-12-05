import { readDataFile } from "../../internal/readDataFile.js";
export function readWordPairs(filePath, orFileName) {
    const raw = readDataFile(filePath, `language/${orFileName}`);
    if (raw) {
        return raw.split("\n").map(line => line.split(",").map(word => word.trim()));
    }
    return [];
}
