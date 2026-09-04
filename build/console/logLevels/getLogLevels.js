/** All active log levels. */
let _logLevels;
/** @internal */
export function getLogLevels(create) {
    if (!_logLevels && create) {
        _logLevels = new Set();
    }
    return _logLevels;
}
