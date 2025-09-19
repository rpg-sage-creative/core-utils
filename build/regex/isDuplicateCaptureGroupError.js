import { isErrorLike } from "../types/index.js";
import { indexCaptureGroups } from "./indexCaptureGroups.js";
const name = "SyntaxError";
const prefix = "Invalid regular expression: ";
const suffix = ": Duplicate capture group name";
export function isDuplicateCaptureGroupError(ex) {
    return isErrorLike(ex, err => err.name === name && err.message.startsWith(prefix) && err.message.endsWith(suffix));
}
export function retryDuplicateCaptureGroupName(err) {
    const source = err.message.slice(prefix.length, -suffix.length);
    const lastSlashIndex = source.lastIndexOf("/");
    const indexedSource = indexCaptureGroups(source.slice(1, lastSlashIndex));
    const flags = source.slice(lastSlashIndex + 1);
    return new RegExp(indexedSource, flags);
}
