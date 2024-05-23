import { error } from "../loggers/error.js";
export function errorReturnNull(reason) {
    error(reason);
    return null;
}
