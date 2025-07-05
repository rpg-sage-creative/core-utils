export function isError(err, arg) {
    if (err && err instanceof Error) {
        if (typeof (arg) === "string") {
            return err.message === arg || err.name === arg;
        }
        if (typeof (arg) === "function") {
            return arg(err);
        }
        return true;
    }
    return false;
}
