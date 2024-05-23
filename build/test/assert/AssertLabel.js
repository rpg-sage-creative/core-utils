import { info } from "../../console/loggers/info.js";
let _assertingLabel;
export function startAsserting(label) {
    stopAsserting();
    _assertingLabel = label ?? null;
    if (_assertingLabel) {
        info(`Testing: ${_assertingLabel} ...`);
    }
}
export function stopAsserting() {
    if (_assertingLabel) {
        info(`Testing: ${_assertingLabel} ... done.`);
    }
    _assertingLabel = null;
}
export function getAssertLabel() {
    return _assertingLabel ?? null;
}
