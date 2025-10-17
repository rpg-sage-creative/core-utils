import { UuidRegExp } from "./UuidRegExp.js";
export function parseUuid(value) {
    if (!value)
        return undefined;
    return UuidRegExp.exec(value ?? "")?.groups?.uuid;
}
