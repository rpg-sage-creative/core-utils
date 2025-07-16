import { dequote, getQuotedRegex, getWhitespaceRegex, tokenize, type TokenParsers } from "../string/index.js";
import type { EnumLike, OrUndefined } from "../types/generics.js";
import { isDefined, parseEnum } from "../types/index.js";
import { getKeyValueArgRegex } from "./getKeyValueArgRegex.js";
import { parseIncrementArg } from "./parseIncrementArg.js";
import { parseKeyValueArg } from "./parseKeyValueArg.js";
import type { FlagArg, IncrementArg, KeyValueArg, ValueArg } from "./types.js";

type Arg<T extends string, U extends string> = FlagArg<T> | IncrementArg<T, U> | KeyValueArg<T, U> | ValueArg<T>;

const flagRegex = /^\-+\w+$/;
const flagDashRegex = /^\-+/;

function _parseFlagArg<T extends string>(arg: string, index: number): OrUndefined<FlagArg<T>> {
	if (flagRegex.test(arg)) {
		const key = arg.replace(flagDashRegex, "") as T;
		const keyRegex = new RegExp(`^${key}$`, "i");
		return { arg, index, isFlag:true, key, keyRegex };
	}
	return undefined;
}

function _parseIncrementArg<T extends string, U extends string>(arg: T, index: number): OrUndefined<IncrementArg<T, U>> {
	const incrementArg = parseIncrementArg<T, U>(arg);
	if (incrementArg) {
		const value = incrementArg.value === "" ? null : incrementArg.value ?? null;
		return { ...incrementArg, index, value };
	}
	return undefined;
}

function _parseKeyValueArg<T extends string, U extends string>(arg: T, index: number): OrUndefined<KeyValueArg<T, U>> {
	const keyValueArg = parseKeyValueArg<T, U>(arg);
	if (keyValueArg) {
		const value = keyValueArg.value === "" ? null : keyValueArg.value ?? null;
		return { ...keyValueArg, index, value };
	}
	return undefined;
}

function _parseValueArg<T extends string>(arg: T, index: number): OrUndefined<ValueArg<T>> {
	if (isDefined(arg)) {
		const value = arg === "" ? null : dequote(arg, { contents:"*" }) as T;
		return { arg, index, isValue:true, value }
	}
	return undefined;
}

/** Parses the input/index to ArgData. */
function parseArg<T extends string, U extends string>(arg: T, index: number): OrUndefined<Arg<T, U>> {
	return _parseKeyValueArg<T, U>(arg, index)
		?? _parseIncrementArg<T, U>(arg, index)
		?? _parseFlagArg<T>(arg, index)
		?? _parseValueArg<T>(arg, index);
}

export class ArgsManager<T extends string = string> {
	private _args: Arg<T, string>[];
	private _flagArgs?: FlagArg<T>[];
	private _incrementArgs?: IncrementArg<T, any>[];
	private _keyValueArgs?: KeyValueArg<T, any>[];
	private _strings: string[];
	private _valueArgs?: ValueArg<T>[];

	public constructor(raw?: string[]) {
		this._strings = raw?.slice() ?? [];
		this._args = raw?.map(parseArg).filter(isDefined) as Arg<T, any>[] ?? [];
	}

	/** Returns the count of defined Args. This may differ from the count of the original (raw) string array. */
	public get length(): number {
		return this._args.length;
	}

	/** Returns an array of all the Args. */
	public args(): Arg<T, string>[] {
		return this._args.slice();
	}

	/** Sends all ValueArgs to parseEnum and returns only valid (defined) results. */
	public enumValues<K extends string = string, V extends number = number>(enumLike: EnumLike<K, V>): V[] {
		return this.valueArgs().map(arg => parseEnum<EnumLike<K, V>>(enumLike, arg.value)).filter(isDefined) as V[];
	}

	/** Returns KeyValueArg for the given key. */
	public findKeyValueArg<U extends string = string>(key: string): OrUndefined<KeyValueArg<T, U>> {
		return this._args.find(arg => arg.isKeyValue && arg.keyRegex.test(key)) as OrUndefined<KeyValueArg<T, U>>;
	}

	/** Returns all FlagArg from .parseArgs() where .isFlag is true. */
	public flagArgs(): FlagArg<T>[] {
		this._flagArgs ??= this._args.filter(arg => arg.isFlag) as FlagArg<T>[];
		return this._flagArgs.slice();
	}

	/** Returns all IncrementArg from .parseArgs() where .isIncrement is true. */
	public incrementArgs<U extends string = string>(): IncrementArg<T, U>[] {
		this._incrementArgs ??= this._args.filter(arg => arg.isIncrement) as IncrementArg<T, U>[];
		return this._incrementArgs.slice();
	}

	/** Returns all KeyValueArg, optionally filtering by the given KeyResolvables. */
	public keyValueArgs<U extends string = string>(...keys: string[]): KeyValueArg<T, U>[] {
		this._keyValueArgs ??= this._args.filter(arg => arg.isKeyValue) as KeyValueArg<T, U>[];
		if (keys.length) {
			return this._keyValueArgs.filter(arg => keys.some(key => arg.keyRegex.test(key)));
		}
		return this._keyValueArgs.slice();
	}

	/** Returns the original (raw) string array. */
	public raw(): string[] {
		return this._strings.slice();
	}

	/** Returns all ValueArg from .parseArgs() where .isValue is true. */
	public valueArgs(): ValueArg<T>[] {
		this._valueArgs ??= this._args.filter(arg => arg.isValue) as ValueArg<T>[];
		return this._valueArgs.slice();
	}

	/** Splits the given value into arguments by tokenizing it and then creating an ArgsManager from the resulting array. */
	public static from<T extends string = string>(value: string, additionalParsers?: TokenParsers): ArgsManager<T>;

	/** Creates an ArgsManager with a copy of the given values. */
	public static from<T extends string = string>(values: ArrayLike<string> | Iterable<string>): ArgsManager<T>;

	/** Creates a copy of the given ArgsManager. */
	public static from<T extends string = string>(other: ArgsManager<T>): ArgsManager<T>;

	public static from<T extends string = string>(content: string | ArrayLike<string> | Iterable<string> | ArgsManager<T>, additionalParsers: TokenParsers = {}): ArgsManager<T> {
		if (!content) {
			return new ArgsManager<T>();
		}

		if (typeof(content) !== "string") {
			const values = Array.from("args" in content ? content._strings : content);
			return new ArgsManager<T>(values);
		}

		const trimmed = content.trim();
		if (!trimmed.length) {
			return new ArgsManager<T>();
		}

		const parsers: TokenParsers = {
			arg: getKeyValueArgRegex(),
			spaces: getWhitespaceRegex(),
			quotes: getQuotedRegex({ contents:"*" }),
			...additionalParsers
		};

		const raw = tokenize(trimmed, parsers).map(token => token.token);
		return new ArgsManager(raw);
	}

}
