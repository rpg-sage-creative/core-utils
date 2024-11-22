import { readFile } from "./readFile.js";
export function readWords(filePath, orFileName) {
    const raw = readFile(filePath, orFileName);
    if (raw) {
        return raw.split("\n").map(word => word.trim());
    }
    return [];
}
