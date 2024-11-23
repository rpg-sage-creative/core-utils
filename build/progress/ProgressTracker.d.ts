export type ProgressTrackerEventName = "error" | "started" | "increment" | "status" | "finished";
export type ProgressTrackerEventData<EventName extends ProgressTrackerEventName> = {
    eventName: EventName;
    tracker: ProgressTracker;
    message: string;
};
type ProgressTrackerEventHandler<EventName extends ProgressTrackerEventName> = (eventData: ProgressTrackerEventData<EventName>) => unknown;
/**
 * A class for logging percent complete of a task.
 * Uses verbose from core-utils.
 */
export declare class ProgressTracker {
    label: string;
    total: number;
    interval: number;
    countComplete: number;
    lastInterval: number;
    percentComplete: number;
    started: boolean;
    finished: boolean;
    protected handlers: Map<ProgressTrackerEventName, Set<ProgressTrackerEventHandler<any>>>;
    on<EventName extends ProgressTrackerEventName>(eventName: EventName, handler: ProgressTrackerEventHandler<EventName>): this;
    private handle;
    constructor(label: string, total?: number, interval?: number);
    /**
     * Starts the logger if the existing (or given) total is greater than 0.
     * If started, logs 0% complete.
     */
    start(total?: number): void;
    /**
     * Increments the counter (by 1 if count not given).
     * Attempts to start (if not already).
     * If started, calculates percent complete and logs if different than last interval.
     */
    increment(count?: number): void;
    /**
     * Logs the current percent complete.
     * Only *IF* this logger was successfully started.
     */
    status(): void;
    /**
     * Logs an error.
     * Only *IF* this logger was successfully started.
     */
    error(message?: string): void;
    /**
     * Logs one last percentage marker.
     * Only *IF* this logger was successfully started.
     * Only *IF* the last interval logged wasn't 100 (to avoid double reporting 100%).
     * force100 allows you to force the final output to report 100%
     */
    finish(force100?: boolean): void;
}
export {};
