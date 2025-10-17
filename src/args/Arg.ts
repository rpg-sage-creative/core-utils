import { regex } from "regex";
import type { FlagArg, IncrementArg, KeyValueArg } from "./types.js";

type Args = {
	isFlag?: boolean;
	isIncrement?: boolean;
	isKeyValue?: boolean;
	isValue?: boolean;

	index?: number;
	key?: string;
	operator?: "-" | "+";
	raw: string;
	value?: string | number | null;
};

/**
 * Underling class for FlagArg, IncrementArg, and KeyValueArg.
 * Primary purpose is to have keyLower and keyRegex available on demand, cached after first use.
 */
export class Arg {

	// public isFlag?: boolean;
	// public isIncrement?: boolean;
	// public isKeyValue?: boolean;
	// public isValue?: boolean;

	public index: number;
	public key!: string;
	// public operator?: "-" | "+";
	// public raw!: string;
	// public value?: string | number | null;

	private constructor(args: Args) {
		Object.assign(this, args);
		this.index ??= -1;
	}

	#keyLower?: Lowercase<string>;
	public get keyLower(): Lowercase<string> {
		return this.#keyLower ??= this.key.toLowerCase() ?? "";
	}

	#keyRegex?: RegExp;
	public get keyRegex(): RegExp {
		return this.#keyRegex ??= regex("i")`^${this.key}$`;
	}

	public static from(args: Omit<FlagArg, "index" | "keyLower" | "keyRegex"> & { index?:number; }): FlagArg;
	public static from(args: Omit<IncrementArg, "index" | "keyLower" | "keyRegex"> & { index?:number; }): IncrementArg;
	public static from(args: Omit<KeyValueArg, "index" | "keyLower" | "keyRegex"> & { index?:number; }): KeyValueArg;
	public static from(args: Args): Arg { return new Arg(args); }
}