import type { LogLevelName } from "./LogLevel.js";
/** Disables the given log level from actually writing to logging. */
export declare function disableLogLevel(...logLevels: LogLevelName[]): void;
