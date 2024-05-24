import { captureProcessExit } from "./console/captureProcessExit.js";
import { getCodeName } from "./env/getCodeName.js";
export function initializeConsoleUtilsByEnvironment() {
    captureProcessExit();
    getCodeName(true);
}
