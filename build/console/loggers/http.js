import { getLogger } from "../getLogger.js";
export function http(...args) {
    getLogger().http(...args);
}
