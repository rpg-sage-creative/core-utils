import { error, verbose } from "../console/index.js";
import { ProgressTracker } from "./ProgressTracker.js";
export class PercentLogger extends ProgressTracker {
    constructor(label, total, interval) {
        super(label, total, interval);
        this.on("status", evData => verbose(evData.message));
        this.on("error", evData => error(evData.message));
    }
}
