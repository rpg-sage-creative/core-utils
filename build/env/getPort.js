import { getFromProcess } from "./getFromProcess.js";
import { getFromProcessSafely } from "./getFromProcessSafely.js";
const _ports = {};
export function getPort(server, ignoreMissing) {
    if (!_ports[server]) {
        const numberValidator = (value) => {
            return /^\d+$/.test(String(value));
        };
        const getter = ignoreMissing ? getFromProcessSafely : getFromProcess;
        const key = `${server.toLowerCase()}Port`;
        const value = getter(numberValidator, key);
        _ports[server] = value ? +value : 0;
    }
    return _ports[server];
}
