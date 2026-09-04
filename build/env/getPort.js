import { isWholeNumberString } from "@rsc-utils/type-utils";
import { getFromProcess } from "./getFromProcess.js";
import { getFromProcessSafely } from "./getFromProcessSafely.js";
const _ports = {};
export function getPort(server, ignoreMissing) {
    if (!(server in _ports)) {
        const numberValidator = (value) => {
            if (typeof (value) === "number" || isWholeNumberString(value)) {
                const port = +value;
                // system ports are 0 - 1023; 65535 is unsigned 16-bit int max
                // https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers
                return port > 1023 && port <= 65535;
            }
            return false;
        };
        const getter = ignoreMissing ? getFromProcessSafely : getFromProcess;
        const key = `${server.toLowerCase()}Port`;
        const value = getter(numberValidator, key);
        _ports[server] = value ? +value : null;
    }
    return _ports[server] ?? undefined;
}
