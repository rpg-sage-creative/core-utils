import { error } from "../loggers/error.js";
/** Used for catching a Promise. Logs the reason to getLogger().error and then returns undefined. */
export function errorReturnUndefined(reason) {
    error(reason);
    return undefined;
}
