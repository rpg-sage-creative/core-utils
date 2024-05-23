import { getLogger } from "../getLogger.js";
export function debug(...args) {
    getLogger().debug(...args);
}
