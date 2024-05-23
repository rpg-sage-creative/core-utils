import type { LogLevelName } from "../logLevels/LogLevel.js";
/** Adds an extra handler to the given logging level. */
export declare function addLogHandler(logLevel: LogLevelName, handler: Function): void;
