import { enableColorLevel } from "./enableColorLevel.js";
export function enableColorLevels(env) {
    switch (env) {
        case "development":
            enableColorLevel("silly", "debug", "verbose", "http", "info", "warn", "error");
            break;
        case "test":
            enableColorLevel("verbose", "http", "info", "warn", "error");
            break;
        case "production":
            enableColorLevel("info", "warn", "error");
            break;
    }
}
