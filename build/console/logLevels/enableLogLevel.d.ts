import type { LogLevelName } from "./LogLevel.js";
/**
 * Enables the given log level to actually write to logging.
 */
export declare function enableLogLevel(...logLevels: LogLevelName[]): void;
