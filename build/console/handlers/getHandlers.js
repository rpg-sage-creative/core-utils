let _handlers;
export function getHandlers(create) {
    if (!_handlers && create) {
        _handlers = new Map();
    }
    return _handlers;
}
