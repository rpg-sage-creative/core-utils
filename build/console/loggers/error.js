import { getLogger } from "./getLogger.js";
/** Convenience for getLogger().error(...args) */
export function error(...args) {
    getLogger().error(...args);
}
