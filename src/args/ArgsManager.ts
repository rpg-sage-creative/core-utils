import Collection from "../array/Collection.js";
import { dequote } from "../string/index.js";
import type { OrUndefined } from "../types/generics.js";
import { isDefined } from "../types/index.js";
import { parseIncrementArg } from "./parseIncrementArg.js";
import { parseKeyValueArg } from "./parseKeyValueArg.js";
import type { FlagArg, IncrementArg, KeyValueArg, ValueArg } from "./types.js";

type Arg<T extends string, U extends string> = FlagArg<T> | IncrementArg<T, U> | KeyValueArg<T, U> | ValueArg<T>;
type MappedArg<T extends string, U extends string, V> = Arg<T, U> & { mappedValue: V | null; };

function _parseFlagArg<T extends string>(arg: T, index: number): OrUndefined<FlagArg<T>> {
	if (/^\-+\w+$/.test(arg)) {
		const key = arg.replace(/^\-+/, "");
		const keyLower = key.toLowerCase();
		return { arg, index, isFlag:true, key, keyLower };
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
		const value = arg === "" ? null : dequote(arg) as T;
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

export class ArgsManager<T extends string> extends Collection<T> {
	public constructor();
	public constructor(arrayLength: number);
	public constructor(...items: T[]);
	public constructor(...args: any[]) {
		super(...args);
		this.initialArgs = Array.from(this);
	}

	public initialArgs: T[];

	//#region parsed args

	/** Maps each arg to an ArgData appropriate for the arg value. */
	public parseArgs<U extends string = string>(): OrUndefined<Arg<T, U>>[] {
		return this.map(parseArg) as OrUndefined<Arg<T, U>>[];
	}

	/** Returns KeyValueArg for the given key. */
	public findKeyValueArg<U extends string = string>(key: string): OrUndefined<KeyValueArg<T, U>> {
		// to avoid parsing every arg for every time and filtering and then finding, let's just do a single loop here
		for (let index = 0; index < this.length; index++) {
			const arg = this[index];
			const keyValueArg = parseKeyValueArg<T, U>(arg, { key });
			if (keyValueArg) {
				const value = keyValueArg.value === "" ? null : keyValueArg.value ?? null;
				return { ...keyValueArg, index, value }
			}
		}
		return undefined;
	}

	/** Returns all KeyValueArg from .parseArgs() where .isKeyValue is true. */
	public keyValueArgs<U extends string = string>() {
		return this.map(_parseKeyValueArg).filter(isDefined) as Collection<KeyValueArg<T, U>>;
	}

	/** Returns all IncrementArg from .parseArgs() where .isIncrement is true. */
	public incrementArgs<U extends string = string>() {
		return this.map(_parseIncrementArg).filter(isDefined) as Collection<IncrementArg<T, U>>;
	}

	/** Returns all FlagArg from .parseArgs() where .isFlag is true. */
	public flagArgs() {
		return this.map(_parseFlagArg).filter(isDefined) as Collection<FlagArg<T>>;
	}

	/** Returns all ValueArg from .parseArgs() where .isValue is true. */
	public valueArgs() {
		return this.map(_parseValueArg).filter(isDefined) as Collection<ValueArg<T>>;
	}

	//#endregion


	//#region Synchronous find

	/**
	 * Calls the given predicate for each arg that successfully parses to an ArgData object.
	 * The first arg to return a defined value is returned with that value as .ret.
	 * Undefined if arg not found.
	 */
	public findMap<U extends string = string, V = any>(predicate: (value: Arg<T, U>, index: number, obj: T[]) => unknown, thisArg?: any): OrUndefined<MappedArg<T, U, V>> {
		const length = this.length;
		for (let index = 0; index < length; index++) {
			const arg = this[index];
			const argData = parseArg<T, U>(arg, index);
			if (argData) {
				const mappedValue = predicate.call(thisArg, argData, index, this) as V;
				if (isDefined(mappedValue)) {
					return { ... argData, mappedValue };
				}
			}
		}
		return undefined;
	}

	//#endregion

}
