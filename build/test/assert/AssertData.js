import { getAssertLabel } from "./AssertLabel.js";
let _assertData;
export function clearAssertData() {
    _assertData = null;
}
export function getAssertData() {
    return _assertData ?? { total: 0, passed: 0, failed: 0, labeled: [] };
}
export function incrementAssertData(passed) {
    const assertData = _assertData ?? (_assertData = { total: 0, passed: 0, failed: 0, labeled: [] });
    assertData.total++;
    if (passed) {
        assertData.passed++;
    }
    else {
        assertData.failed++;
    }
    const label = getAssertLabel();
    if (label) {
        let labeledData = assertData.labeled.find(data => data.label === label);
        if (!labeledData) {
            labeledData = { total: 0, passed: 0, failed: 0, label };
            assertData.labeled.push(labeledData);
        }
        labeledData.total++;
        if (passed) {
            labeledData.passed++;
        }
        else {
            labeledData.failed++;
        }
    }
}
