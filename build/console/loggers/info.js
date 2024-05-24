import { getLogger } from "./getLogger.js";
export function info(...args) {
    getLogger().info(...args);
}
