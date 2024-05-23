let _logLevels;
export function getLogLevels(create) {
    if (!_logLevels && create) {
        _logLevels = new Set();
    }
    return _logLevels;
}
