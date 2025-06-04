import { dequote, getQuotedRegex, getWhitespaceRegex, tokenize } from "../string/index.js";
import { isDefined, parseEnum } from "../types/index.js";
import { getKeyValueArgRegex } from "./getKeyValueArgRegex.js";
import { parseIncrementArg } from "./parseIncrementArg.js";
import { parseKeyValueArg } from "./parseKeyValueArg.js";
function _parseFlagArg(arg, index) {
    if (/^\-+\w+$/.test(arg)) {
        const key = arg.replace(/^\-+/, "");
        const keyRegex = new RegExp(`^${key}$`, "i");
        return { arg, index, isFlag: true, key, keyRegex };
    }
    return undefined;
}
function _parseIncrementArg(arg, index) {
    const incrementArg = parseIncrementArg(arg);
    if (incrementArg) {
        const value = incrementArg.value === "" ? null : incrementArg.value ?? null;
        return { ...incrementArg, index, value };
    }
    return undefined;
}
function _parseKeyValueArg(arg, index) {
    const keyValueArg = parseKeyValueArg(arg);
    if (keyValueArg) {
        const value = keyValueArg.value === "" ? null : keyValueArg.value ?? null;
        return { ...keyValueArg, index, value };
    }
    return undefined;
}
function _parseValueArg(arg, index) {
    if (isDefined(arg)) {
        const value = arg === "" ? null : dequote(arg, { contents: "*" });
        return { arg, index, isValue: true, value };
    }
    return undefined;
}
function parseArg(arg, index) {
    return _parseKeyValueArg(arg, index)
        ?? _parseIncrementArg(arg, index)
        ?? _parseFlagArg(arg, index)
        ?? _parseValueArg(arg, index);
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
        this._args = raw?.map(parseArg).filter(isDefined) ?? [];
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
    findKeyValueArg(key) {
        return this._args.find(arg => arg.isKeyValue && arg.keyRegex.test(key));
    }
    flagArgs() {
        this._flagArgs ??= this._args.filter(arg => arg.isFlag);
        return this._flagArgs.slice();
    }
    incrementArgs() {
        this._incrementArgs ??= this._args.filter(arg => arg.isIncrement);
        return this._incrementArgs.slice();
    }
    keyValueArgs(...keys) {
        this._keyValueArgs ??= this._args.filter(arg => arg.isKeyValue);
        if (keys.length) {
            return this._keyValueArgs.filter(arg => keys.some(key => arg.keyRegex.test(key)));
        }
        return this._keyValueArgs.slice();
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
            arg: getKeyValueArgRegex(),
            spaces: getWhitespaceRegex(),
            quotes: getQuotedRegex({ contents: "*" }),
            ...additionalParsers
        };
        const raw = tokenize(trimmed, parsers).map(token => token.token);
        return new ArgsManager(raw);
    }
}
