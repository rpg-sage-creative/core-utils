import { enableLogLevel } from "./enableLogLevel.js";
export function enableLogLevels(env) {
    switch (env) {
        case "development":
            enableLogLevel("silly", "debug", "verbose", "http", "info", "warn", "error");
            break;
        case "test":
            enableLogLevel("verbose", "http", "info", "warn", "error");
            break;
        case "production":
            enableLogLevel("info", "warn", "error");
            break;
    }
}
