import Collection from "../array/Collection.js";
import { dequote } from "../string/index.js";
import { isDefined } from "../types/index.js";
import { parseIncrementArg } from "./parseIncrementArg.js";
import { parseKeyValueArg } from "./parseKeyValueArg.js";
function _parseFlagArg(arg, index) {
    if (/^\-+\w+$/.test(arg)) {
        const key = arg.replace(/^\-+/, "");
        const keyLower = key.toLowerCase();
        return { arg, index, isFlag: true, key, keyLower };
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
        const value = arg === "" ? null : dequote(arg);
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
export class ArgsManager extends Collection {
    constructor(...args) {
        super(...args);
        this.initialArgs = Array.from(this);
    }
    initialArgs;
    parseArgs() {
        return this.map(parseArg);
    }
    findKeyValueArg(key) {
        for (let index = 0; index < this.length; index++) {
            const arg = this[index];
            const keyValueArg = parseKeyValueArg(arg, { key });
            if (keyValueArg) {
                const value = keyValueArg.value === "" ? null : keyValueArg.value ?? null;
                return { ...keyValueArg, index, value };
            }
        }
        return undefined;
    }
    keyValueArgs() {
        return this.map(_parseKeyValueArg).filter(isDefined);
    }
    incrementArgs() {
        return this.map(_parseIncrementArg).filter(isDefined);
    }
    flagArgs() {
        return this.map(_parseFlagArg).filter(isDefined);
    }
    valueArgs() {
        return this.map(_parseValueArg).filter(isDefined);
    }
    findMap(predicate, thisArg) {
        const length = this.length;
        for (let index = 0; index < length; index++) {
            const arg = this[index];
            const argData = parseArg(arg, index);
            if (argData) {
                const mappedValue = predicate.call(thisArg, argData, index, this);
                if (isDefined(mappedValue)) {
                    return { ...argData, mappedValue };
                }
            }
        }
        return undefined;
    }
}
