import { getAwsRegion } from "./getAwsRegion.js";
import { getFromProcessSafely } from "./getFromProcessSafely.js";
import { getPort } from "./getPort.js";
const _endpoints = {};
export function getEndpoint(server) {
    if (!_endpoints[server]) {
        const booleanValidator = (value) => {
            return /^(true|false)$/.test(String(value));
        };
        const hostnameValidator = (value, region) => {
            const stringValue = String(value);
            return /^\d+(\.\d+){3}$/.test(stringValue)
                || stringValue.includes(`.lambda-url.${region}.on.aws`)
                || stringValue.includes(`.${region}.compute.amazonaws.com`)
                || stringValue.includes("localhost");
        };
        const region = getAwsRegion(`${server.toLowerCase()}Region`);
        const secure = getFromProcessSafely(booleanValidator, `${server.toLowerCase()}Secure`) === "true";
        const hostname = getFromProcessSafely(value => hostnameValidator(value, region), `${server.toLowerCase()}Hostname`);
        const port = getPort(server);
        const valid = hostname && port ? true : false;
        const endpoint = { secure, hostname, port, region, valid };
        _endpoints[server] = endpoint;
    }
    return _endpoints[server];
}
