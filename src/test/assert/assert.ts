import { assertBool } from "./assertBool.js";
import { assertSync } from "./assertSync.js";

/** @deprecated use assertAsync, assertBool, or assertSync */
export function assert(...args: any[]): void {
	const handler: Function = typeof(args[1]) === "function" ? assertSync : assertBool;
	handler(...args);
}