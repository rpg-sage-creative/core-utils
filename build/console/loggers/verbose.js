import { getLogger } from "./getLogger.js";
export function verbose(...args) {
    getLogger().verbose(...args);
}
