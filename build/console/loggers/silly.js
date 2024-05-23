import { getLogger } from "../getLogger.js";
export function silly(...args) {
    getLogger().silly(...args);
}
