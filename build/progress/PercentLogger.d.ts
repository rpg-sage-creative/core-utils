import { ProgressTracker } from "./ProgressTracker.js";
/**
 * A simple subclass of ProgressTracker that logs status events to verbose and error events to error.
 */
export declare class PercentLogger extends ProgressTracker {
    constructor(label: string, total?: number, interval?: number);
}
