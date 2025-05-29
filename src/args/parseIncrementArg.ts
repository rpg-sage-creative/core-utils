import { dequote } from "../string/index.js";
import { getIncrementArgRegex, type RegExpIncrementArgOptions } from "./getIncrementArgRegex.js";
import type { IncrementArg } from "./types.js";

export function parseIncrementArg<ValueType extends string = string>(input: string, options?: RegExpIncrementArgOptions): IncrementArg<string, ValueType> | undefined;

export function parseIncrementArg<ArgType extends string = string, ValueType extends string = string>(input: ArgType, options?: RegExpIncrementArgOptions): IncrementArg<ArgType, ValueType> | undefined;

export function parseIncrementArg(arg: string, options?: RegExpIncrementArgOptions): IncrementArg<string, string> | undefined {
	const regex = getIncrementArgRegex(options);
	const match = regex.exec(arg);
	if (match) {
		const [_, key, incrementer, modifier, value] = match;
		const keyLower = key.toLowerCase();
		if (incrementer) {
			return { arg, index:-1, isIncrement:true, key, keyLower, operator: incrementer[0] as "+", value: "1" };
		}
		return { arg, index:-1, isIncrement:true, key, keyLower, operator: modifier[0] as "+", value: dequote(value) };
	}
	return undefined;
}