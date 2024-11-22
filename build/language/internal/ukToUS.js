let _UKtoUS;
export function getUKtoUS() {
    if (!_UKtoUS) {
        _UKtoUS = new Map();
    }
    return _UKtoUS;
}
export function ukToUS(uk) {
    return uk ? _UKtoUS?.get(uk) : undefined;
}
export function hasUKtoUS(uk) {
    return uk ? _UKtoUS?.has(uk) ?? false : false;
}
