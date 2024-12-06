import Collection from "../array/Collection.js";
import { isKeyValueArg } from "./isKeyValueArg.js";
import { parseKeyValueArg } from "./parseKeyValueArg.js";
function parseKeyValuePair(input, index) {
    const keyValueArg = parseKeyValueArg(input);
    if (keyValueArg) {
        const key = keyValueArg.key;
        const value = keyValueArg.value === "" ? null : keyValueArg.value ?? null;
        return { key, value, index };
    }
    return undefined;
}
export class ArgsManager extends Collection {
    constructor(...args) {
        super(...args);
        this.initialArgs = Array.from(this);
    }
    initialArgs;
    parseKeyValuePairs() {
        return this.map(parseKeyValuePair);
    }
    keyValuePairs() {
        const pairs = this.parseKeyValuePairs();
        return pairs.filter(kvp => kvp);
    }
    findKeyValueArgIndex(key) {
        return this.findArgIndexRet(arg => parseKeyValueArg(arg, { key }));
    }
    findArgIndexNonArgs() {
        return this
            .map((arg, index) => { return { arg: arg, index: index, ret: null }; })
            .filter(withIndex => !isKeyValueArg(withIndex.arg));
    }
    findArgIndexRet(predicate, thisArg) {
        const length = this.length;
        for (let index = 0; index < length; index++) {
            const arg = this[index], ret = predicate.call(thisArg, arg, index, this);
            if (ret) {
                return { arg: arg, index: index, ret: ret };
            }
        }
        return undefined;
    }
}
