import { getHandlers } from "./getHandlers.js";
export function addLogHandler(logLevel, handler) {
    const handlers = getHandlers(true);
    if (!handlers.has(logLevel)) {
        handlers.set(logLevel, new Set());
    }
    handlers.get(logLevel).add(handler);
}
