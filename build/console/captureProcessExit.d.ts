import type { Awaitable } from "../types/generics.js";
type SignalEventName = 
/** interrupt from keyboard (such as Ctrl+C): do normal shutdown and cleanup processes */
"SIGINT"
/** quit from keyboard: often considered a debugging exit (as in leave temp files or write data dumps to logs) */
 | "SIGQUIT"
/** Termination signal: do normal shutdown and cleanup processes */
 | "SIGTERM"
/** Hangup detected on controlling terminal or death of controlling process: ?? */
 | "SIGHUP";
type SignalHandler = (eventName: SignalEventName, code?: number) => Awaitable<void>;
/** Captures SIGINT events to log them before exiting the process. */
export declare function captureProcessExit(): void;
/**
 * Captures SIGINT events to log them and pass to the given handler before exiting the process.
 * The process will exit with code 0 if no listener threw an error.
 */
export declare function captureProcessExit(signalHandler: SignalHandler): void;
export {};
