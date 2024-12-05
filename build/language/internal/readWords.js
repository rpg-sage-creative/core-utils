import { readDataFile } from "../../internal/readDataFile.js";
export function readWords(filePath, orFileName) {
    const raw = readDataFile(filePath, `language/${orFileName}`);
    if (raw) {
        return raw.split("\n").map(word => word.trim());
    }
    return [];
}
