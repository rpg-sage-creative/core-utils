import { getCodeName } from "./getCodeName.js";
import { getFromProcess } from "./getFromProcess.js";
import { logAndReturn } from "./internal/logAndReturn.js";
function getByName(name) {
    const numberValidator = (value) => {
        return /^\d+$/.test(String(value));
    };
    const key = `${name.toLowerCase()}Port`;
    const value = getFromProcess(numberValidator, key);
    return +value;
}
function getBotDelta() {
    const bot = getCodeName();
    switch (bot) {
        case "stable":
            return 0;
        case "beta":
            return 10;
        default:
            return 100;
    }
}
function getByIndex(serverIndex) {
    const base = 3000;
    const botDelta = getBotDelta();
    const value = base + botDelta + serverIndex;
    return logAndReturn(`Port(${serverIndex})=${base}+${botDelta}+${serverIndex}`, value);
}
const _ports = {};
export function getPort(server) {
    if (!_ports[server]) {
        if (typeof (server) === "string") {
            _ports[server] = getByName(server);
        }
        else {
            _ports[server] = getByIndex(server);
        }
    }
    return _ports[server];
}
