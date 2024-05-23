import { getHandlers } from "./getHandlers.js";
export function removeLogHandler(...args) {
    const handlers = getHandlers();
    if (!handlers) {
        return;
    }
    const handler = args.pop();
    const logLevel = args[0];
    if (logLevel) {
        handlers.get(logLevel)?.delete(handler);
    }
    else {
        handlers.forEach(set => set.delete(handler));
    }
}
