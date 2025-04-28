import { getFromProcess } from "./getFromProcess.js";
const _ports = {};
export function getPort(server) {
    if (!_ports[server]) {
        const numberValidator = (value) => {
            return /^\d+$/.test(String(value));
        };
        const key = `${server.toLowerCase()}Port`;
        const value = getFromProcess(numberValidator, key);
        _ports[server] = +value;
    }
    return _ports[server];
}
