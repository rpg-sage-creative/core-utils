import { error, verbose } from "../console/index.js";
import { ProgressTracker } from "./ProgressTracker.js";
/**
 * A simple subclass of ProgressTracker that logs status events to verbose and error events to error.
 */
export class PercentLogger extends ProgressTracker {
    constructor(label, total, interval) {
        super(label, total, interval);
        this.on("status", evData => verbose(evData.message));
        this.on("error", evData => error(evData.message));
    }
}
