import { getNoiseUS } from "./internal/noiseUS.js";
import { readWords } from "./internal/readWords.js";
export function initializeNoiseUS(filePath) {
    const noiseUS = getNoiseUS();
    if (noiseUS.size) {
        return 0;
    }
    const words = readWords(filePath, "noiseUS.txt");
    words.forEach(word => noiseUS.add(word));
    return noiseUS.size;
}
