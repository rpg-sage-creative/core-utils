import { isDefined, parseEnum } from "@rsc-utils/type-utils";
import { WhitespaceRegExp } from "@rsc-utils/whitespace-utils";
import { dequote, isNotBlank, tokenize } from "../string/index.js";
import { QuotedContentRegExp } from "../string/quotes/QuotedContentRegExp.js";
import { FlagArgRegExp, parseFlagArg } from "./parseFlagArg.js";
import { IncrementArgRegExp, parseIncrementArg } from "./parseIncrementArg.js";
import { KeyValueArgRegExp, parseKeyValueArg } from "./parseKeyValueArg.js";
function parseValueArg(raw, index) {
    if (isNotBlank(raw)) {
        const dequoted = dequote(raw);
        const value = dequoted === "" ? null : dequoted;
        return { raw, index, isValue: true, value };
    }
    return undefined;
}
/** Parses the input/index to ArgData. */
function parseArg(arg, index) {
    return parseKeyValueArg(arg, index)
        ?? parseIncrementArg(arg, index)
        ?? parseFlagArg(arg, index)
        ?? parseValueArg(arg, index);
}
export class ArgsManager {
    _args;
    _flagArgs;
    _incrementArgs;
    _keyValueArgs;
    _strings;
    _valueArgs;
    constructor(raw) {
        // store original input
        this._strings = raw?.slice() ?? [];
        // we do not want to include blank strings as args; they are separators
        this._args = raw?.filter(isNotBlank).map(parseArg) ?? [];
    }
    // public [Symbol.]
    /** Returns the count of defined Args. This may differ from the count of the original (raw) string array. */
    get length() {
        return this._args.length;
    }
    /** Returns an array of all the Args. */
    args() {
        return this._args.slice();
    }
    /** Sends all ValueArgs to parseEnum and returns only valid (defined) results. */
    enumValues(enumLike) {
        return this.valueArgs().map(arg => parseEnum(enumLike, arg.value)).filter(isDefined);
    }
    findKeyValueArg(...keys) {
        const keyValueArgs = this.keyValueArgs();
        for (const key of keys) {
            const arg = keyValueArgs.find(arg => arg.keyLower === key);
            if (arg) {
                return arg;
            }
        }
        return undefined;
    }
    /** Returns all FlagArg (.isFlag === true). */
    flagArgs() {
        this._flagArgs ??= this._args.filter(arg => arg.isFlag);
        return this._flagArgs.slice();
    }
    hasFlag(...keys) {
        return this._args.some(arg => arg.isFlag && keys.includes(arg.keyLower));
    }
    /** Returns all IncrementArg (.isIncrement === true), optionally filtering by the given keys. */
    incrementArgs(...keys) {
        this._incrementArgs ??= this._args.filter(arg => arg.isIncrement);
        if (keys.length && this._incrementArgs.length) {
            const lowers = keys.map(key => key.toLowerCase());
            return this._incrementArgs.filter(arg => lowers.includes(arg.keyLower));
        }
        return this._incrementArgs.slice();
    }
    /** Returns all KeyValueArg (.isKeyValue === true), optionally filtering by the given keys. */
    keyValueArgs(...keys) {
        this._keyValueArgs ??= this._args.filter(arg => arg.isKeyValue);
        if (keys.length && this._keyValueArgs.length) {
            const lowers = keys.map(key => key.toLowerCase());
            return this._keyValueArgs.filter(arg => lowers.includes(arg.keyLower));
        }
        return this._keyValueArgs.slice();
    }
    /** Returns all args that are _NOT_ KeyValueArg objects. Used for convenient splitting of args into key/value or simply value. */
    nonKeyValueArgs() {
        const keyValueArgs = this.keyValueArgs();
        return this._args.filter(arg => !keyValueArgs.includes(arg));
    }
    /** Returns all args that are _NOT_ KeyValueArg objects. Used for convenient splitting of args into key/value or simply value. */
    nonKeyValueStrings() {
        return this.nonKeyValueArgs().map(arg => arg.isValue ? arg.value : arg.raw);
    }
    /** Returns the original (raw) string array. */
    raw() {
        return this._strings.slice();
    }
    /** Returns all ValueArg (.isValue === true). */
    valueArgs() {
        this._valueArgs ??= this._args.filter(arg => arg.isValue);
        return this._valueArgs.slice();
    }
    static from(content, additionalParsers = {}) {
        if (!content) {
            return new ArgsManager();
        }
        if (typeof (content) !== "string") {
            const values = Array.from("args" in content ? content._strings : content);
            return new ArgsManager(values);
        }
        const trimmed = content.trim();
        if (!trimmed.length) {
            return new ArgsManager();
        }
        const parsers = {
            flagArg: FlagArgRegExp,
            incrementArg: IncrementArgRegExp,
            keyValueArg: KeyValueArgRegExp,
            spaces: WhitespaceRegExp,
            quotes: QuotedContentRegExp,
            ...additionalParsers
        };
        const raw = tokenize(trimmed, parsers).map(token => token.token);
        return new ArgsManager(raw);
    }
}
