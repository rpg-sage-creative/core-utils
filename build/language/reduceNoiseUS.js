import { isNoiseUS } from "./internal/noiseUS.js";
export function reduceNoiseUS(terms, additionalNoise) {
    const filtered = terms.filter(term => !isNoiseUS(term));
    if (additionalNoise) {
        return filtered.filter(word => !additionalNoise.includes(word));
    }
    return filtered;
}
