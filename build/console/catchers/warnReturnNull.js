import { warn } from "../loggers/warn.js";
export function warnReturnNull(reason) {
    warn(reason);
    return null;
}
