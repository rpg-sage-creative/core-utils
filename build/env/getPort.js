import { getCodeName } from "./getCodeName.js";
import { getFromProcess } from "./internal/getFromProcess.js";
import { logAndReturn } from "./internal/logAndReturn.js";
function isValid(value) {
    return /^\d+$/.test(String(value));
}
function getByName(name) {
    const key = `${name.toLowerCase()}Port`;
    const value = getFromProcess(isValid, key);
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
