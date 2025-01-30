import { warn } from "../loggers/warn.js";
export function warnReturnUndefined(reason) {
    warn(reason);
    return undefined;
}
