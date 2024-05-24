/** Common interface to ensure all logging functions are accessible. */
export interface Logger {
    silly(...args: any[]): void;
    debug(...args: any[]): void;
    verbose(...args: any[]): void;
    http(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
/** Returns the current logger. */
export declare function getLogger(): Logger;
