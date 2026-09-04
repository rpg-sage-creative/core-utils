import { getLogger } from "./getLogger.js";
/** Convenience for getLogger().info(...args) */
export function info(...args) {
    getLogger().info(...args);
}
