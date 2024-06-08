import { info } from "../../console/loggers/info.js";
let _assertingLabel;
export function startAsserting(label) {
    stopAsserting();
    _assertingLabel = label ?? undefined;
    if (_assertingLabel) {
        info(`Testing: ${_assertingLabel} ...`);
    }
}
export function stopAsserting() {
    if (_assertingLabel) {
        info(`Testing: ${_assertingLabel} ... done.`);
    }
    _assertingLabel = undefined;
}
export function getAssertLabel() {
    return _assertingLabel ?? undefined;
}
