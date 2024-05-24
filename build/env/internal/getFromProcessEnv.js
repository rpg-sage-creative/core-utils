export function getFromProcessEnv(key) {
    if (key in process.env) {
        return process.env[key];
    }
    return undefined;
}
