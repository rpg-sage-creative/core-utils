import { error } from "../loggers/error.js";
import { warn } from "../loggers/warn.js";
export function createCatcher(handler, returnValue) {
    return (err) => {
        handler(err);
        return returnValue;
    };
}
