import { isWholeNumberString } from "../types/index.js";
import { getFromProcess } from "./getFromProcess.js";
import { getFromProcessSafely } from "./getFromProcessSafely.js";
const _ports = {};
export function getPort(server, ignoreMissing) {
    if (!_ports[server]) {
        const numberValidator = (value) => {
            if (typeof (value) === "number" || isWholeNumberString(value)) {
                const port = +value;
                return port > 1023 && port <= 65535;
            }
            return false;
        };
        const getter = ignoreMissing ? getFromProcessSafely : getFromProcess;
        const key = `${server.toLowerCase()}Port`;
        const value = getter(numberValidator, key);
        _ports[server] = value ? +value : 0;
    }
    return _ports[server];
}
