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
        this._strings = raw?.slice() ?? [];
        this._args = raw?.filter(isNotBlank).map(parseArg) ?? [];
    }
    get length() {
        return this._args.length;
    }
    args() {
        return this._args.slice();
    }
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
    flagArgs() {
        this._flagArgs ??= this._args.filter(arg => arg.isFlag);
        return this._flagArgs.slice();
    }
    hasFlag(...keys) {
        return this._args.some(arg => arg.isFlag && keys.includes(arg.keyLower));
    }
    incrementArgs(...keys) {
        this._incrementArgs ??= this._args.filter(arg => arg.isIncrement);
        if (keys.length && this._incrementArgs.length) {
            const lowers = keys.map(key => key.toLowerCase());
            return this._incrementArgs.filter(arg => lowers.includes(arg.keyLower));
        }
        return this._incrementArgs.slice();
    }
    keyValueArgs(...keys) {
        this._keyValueArgs ??= this._args.filter(arg => arg.isKeyValue);
        if (keys.length && this._keyValueArgs.length) {
            const lowers = keys.map(key => key.toLowerCase());
            return this._keyValueArgs.filter(arg => lowers.includes(arg.keyLower));
        }
        return this._keyValueArgs.slice();
    }
    nonKeyValueArgs() {
        const keyValueArgs = this.keyValueArgs();
        return this._args.filter(arg => !keyValueArgs.includes(arg));
    }
    nonKeyValueStrings() {
        return this.nonKeyValueArgs().map(arg => arg.isValue ? arg.value : arg.raw);
    }
    raw() {
        return this._strings.slice();
    }
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
