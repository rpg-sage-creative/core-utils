export function createCatcher(handler, returnValue) {
    return (err) => {
        handler(err);
        return returnValue;
    };
}
