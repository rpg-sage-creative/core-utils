import type { LogLevelName } from "../logLevels/LogLevel.js";
/** Removes the handler from all logging levels. */
export declare function removeLogHandler(handler: Function): void;
/** Removes the handler from the given logging level. */
export declare function removeLogHandler(logLevel: LogLevelName, handler: Function): void;
