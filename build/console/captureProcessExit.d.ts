import type { Awaitable } from "@rsc-utils/type-utils";
type SignalEventName = 
/** interrupt from keyboard (such as Ctrl+C): do normal shutdown and cleanup processes */
"SIGINT"
/** quit from keyboard: often considered a debugging exit (as in leave temp files or write data dumps to logs) */
 | "SIGQUIT"
/** Termination signal: do normal shutdown and cleanup processes */
 | "SIGTERM"
/** Hangup detected on controlling terminal or death of controlling process: ?? */
 | "SIGHUP";
type Destroyable = {
    destroy: () => void;
};
type SignalHandler = (eventName: SignalEventName, code?: number) => Awaitable<void>;
/** Captures SIGINT events to log them before exiting the process. */
export declare function captureProcessExit(): void;
/**
 * Captures SIGINT events to log them and call destroy() on the given destroyable before exiting the process.
 * The process will exit with code 0 if no listener threw an error.
 */
export declare function captureProcessExit(destroyable: Destroyable): void;
/**
 * Captures SIGINT events to log them and pass to the given handler before exiting the process.
 * The process will exit with code 0 if no listener threw an error.
 */
export declare function captureProcessExit(signalHandler: SignalHandler): void;
export {};
