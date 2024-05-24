import { getLogger } from "./getLogger.js";
export function error(...args) {
    getLogger().error(...args);
}
