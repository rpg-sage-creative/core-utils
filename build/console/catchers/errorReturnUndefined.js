import { error } from "../loggers/error.js";
export function errorReturnUndefined(reason) {
    error(reason);
    return undefined;
}
