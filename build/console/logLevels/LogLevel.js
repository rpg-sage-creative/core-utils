export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["error"] = 0] = "error";
    LogLevel[LogLevel["warn"] = 1] = "warn";
    LogLevel[LogLevel["info"] = 2] = "info";
    LogLevel[LogLevel["http"] = 3] = "http";
    LogLevel[LogLevel["verbose"] = 4] = "verbose";
    LogLevel[LogLevel["debug"] = 5] = "debug";
    LogLevel[LogLevel["silly"] = 6] = "silly";
})(LogLevel || (LogLevel = {}));
