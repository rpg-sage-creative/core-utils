import { error } from "../loggers/error.js";
export function errorReturnFalse(reason) {
    error(reason);
    return false;
}
