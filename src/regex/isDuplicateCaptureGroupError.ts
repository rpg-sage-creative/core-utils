import { isErrorLike, type ErrorLike } from "../types/index.js";
import { indexCaptureGroups } from "./indexCaptureGroups.js";

type DuplicateCaptureGroupError = ErrorLike<"SyntaxError"> & { _dcge:never; };

const name = "SyntaxError";
const prefix = "Invalid regular expression: ";
const suffix = ": Duplicate capture group name";

export function isDuplicateCaptureGroupError(ex: unknown): ex is DuplicateCaptureGroupError {
	return isErrorLike(ex, err => err.name === name && err.message.startsWith(prefix) && err.message.endsWith(suffix));
}

export function extractInvalidRegex(err: DuplicateCaptureGroupError) {
	const source = err.message.slice(prefix.length, -suffix.length);
	const lastSlashIndex = source.lastIndexOf("/");
	const flags = source.slice(lastSlashIndex + 1);
	return { source, flags };
}

export function retryDuplicateCaptureGroupName(err: DuplicateCaptureGroupError): RegExp {
	const { source, flags } = extractInvalidRegex(err);
	const lastSlashIndex = source.lastIndexOf("/");
	const indexedSource = indexCaptureGroups(source.slice(1, lastSlashIndex));
	return new RegExp(indexedSource, flags);
}