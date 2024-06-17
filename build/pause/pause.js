import { silly } from "../console/index.js";
export async function pause(...args) {
    const first = args[0];
    const ms = first.ms ?? args[0];
    const label = first.label ?? args[1] ?? "Unlabeled";
    const data = first.data ?? undefined;
    const log = first.log;
    if (log)
        silly(`Pausing for ${ms}ms: ${label} ...`);
    await (new Promise(res => setTimeout(res, ms)));
    if (log)
        silly(`Pausing for ${ms}ms: ${label} ... done.`);
    return data;
}
