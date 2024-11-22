import { readWordPairs } from "./internal/readWordPairs.js";
import { getUKtoUS } from "./internal/ukToUS.js";
export function initializeUKtoUS(filePath) {
    const ukToUS = getUKtoUS();
    if (ukToUS.size) {
        return 0;
    }
    const pairs = readWordPairs(filePath, "ukToUS.txt");
    pairs.forEach(([uk, us]) => ukToUS.set(uk, us));
    return ukToUS.size;
}
