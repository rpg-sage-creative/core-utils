import { error } from "../loggers/error.js";
export function errorReturnEmptyArray(reason) {
    error(reason);
    return [];
}
