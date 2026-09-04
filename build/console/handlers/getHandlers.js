/** Extra events to happen when logging at a specific level. */
let _handlers;
export function getHandlers(create) {
    if (!_handlers && create) {
        _handlers = new Map();
    }
    return _handlers;
}
