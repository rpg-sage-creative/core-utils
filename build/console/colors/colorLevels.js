let _colorLevels;
export function getColorLevels(create) {
    if (!_colorLevels && create) {
        _colorLevels = new Set();
    }
    return _colorLevels;
}
