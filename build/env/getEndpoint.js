import { parseBoolean } from "../boolean/parseBoolean.js";
import { getAwsRegion } from "./getAwsRegion.js";
import { getFromProcessSafely } from "./getFromProcessSafely.js";
import { getPort } from "./getPort.js";
const _endpoints = {};
export function getEndpoint(server) {
    if (!_endpoints[server]) {
        const booleanValidator = (value) => {
            return parseBoolean(value) !== undefined;
        };
        const hostnameValidator = (value, region) => {
            const stringValue = String(value);
            return /^\d+(\.\d+){3}$/.test(stringValue)
                || stringValue.includes(`.lambda-url.${region}.on.aws`)
                || stringValue.includes(`.${region}.compute.amazonaws.com`)
                || stringValue.includes("localhost");
        };
        const serverLower = server.toLowerCase();
        const region = getAwsRegion(`${serverLower}Region`);
        const secure = parseBoolean(getFromProcessSafely(booleanValidator, `${serverLower}Secure`));
        const hostname = getFromProcessSafely(value => hostnameValidator(value, region), `${serverLower}Hostname`);
        const port = getPort(server, true);
        const valid = hostname && port ? true : false;
        const endpoint = { secure, hostname, port, region, valid };
        _endpoints[server] = endpoint;
    }
    return _endpoints[server];
}
