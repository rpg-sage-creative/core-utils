import { readFileSync } from "node:fs";
import { error } from "../../console/loggers/error.js";
import { parseJson } from "../../json/parseJson.js";
let _json;
export function getFromEnvJson(key) {
    if (!_json) {
        const path = "./config/env.json";
        try {
            _json = parseJson(readFileSync(path).toString());
        }
        catch {
            error(`Unable to read: ${path}`);
            _json = {};
        }
    }
    if (key in _json) {
        return _json[key];
    }
    return undefined;
}
