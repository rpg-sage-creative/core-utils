let _noiseUS;
export function getNoiseUS() {
    if (!_noiseUS) {
        _noiseUS = new Set();
    }
    return _noiseUS;
}
export function isNoiseUS(word) {
    return word ? _noiseUS?.has(word) ?? false : false;
}
