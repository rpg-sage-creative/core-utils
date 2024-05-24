import { getLogger } from "./getLogger.js";
export function warn(...args) {
    getLogger().warn(...args);
}
