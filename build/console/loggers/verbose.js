import { getLogger } from "./getLogger.js";
/** Convenience for getLogger().verbose(...args) */
export function verbose(...args) {
    getLogger().verbose(...args);
}
