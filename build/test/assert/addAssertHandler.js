import { getHandlers } from "../../console/handlers/getHandlers.js";
export function addAssertHandler(assertMode, handler) {
    const handlers = getHandlers(true);
    if (!handlers.has(assertMode)) {
        handlers.set(assertMode, new Set());
    }
    handlers.get(assertMode).add(handler);
}
