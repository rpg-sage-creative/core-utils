type EnvironmentName = "development" | "test" | "production";
/**
 * Enables the given log levels to actually write with color.
 * RSC default levels (development): enableColorLevel("silly", "debug", "verbose", "http", "info", "warn", "error").
 * RSC default levels (test): enableColorLevel("verbose", "http", "info", "warn", "error").
 * RSC default levels (production): enableColorLevel("info", "warn", "error").
 */
export declare function enableColorLevels(env: EnvironmentName): void;
export {};
