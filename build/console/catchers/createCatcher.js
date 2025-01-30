import { getLogger } from "../loggers/getLogger.js";
export function createCatcher(handler, returnValue) {
    return (err) => {
        getLogger()[handler](err);
        return returnValue;
    };
}
