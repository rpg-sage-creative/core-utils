function _isErrorLike(err) {
    if (err) {
        if (err instanceof Error) {
            return true;
        }
        const type = Object.prototype.toString.call(err);
        if (type === "[object Error]") {
            return true;
        }
        if (type === "[object Object]") {
            return ["message", "name", "stack"].some(key => key in err);
        }
    }
    return false;
}
export function isErrorLike(err, arg) {
    if (_isErrorLike(err)) {
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
