/** All log levels we are coloring. */
let _colorLevels;
/** @internal */
export function getColorLevels(create) {
    if (!_colorLevels && create) {
        _colorLevels = new Set();
    }
    return _colorLevels;
}
