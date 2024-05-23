let _assertMode;
export function getAssertMode() {
    return _assertMode ?? "fail";
}
export function setAssertMode(mode) {
    _assertMode = mode;
}
