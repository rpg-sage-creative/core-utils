import { regex } from "regex";
import { quote } from "../string/index.js";
/**
 * Underlying class for FlagArg, IncrementArg, and KeyValueArg.
 * Primary purpose is to have keyLower and keyRegex available on demand, cached after first use.
 */
export class Arg {
    // public isFlag?: boolean;
    // public isIncrement?: boolean;
    // public isKeyValue?: boolean;
    // public isValue?: boolean;
    index;
    key;
    // public operator?: "-" | "+";
    // public raw!: string;
    // public value?: string | number | null;
    constructor(args) {
        Object.assign(this, args);
        this.index ??= -1;
    }
    #keyLower;
    get keyLower() {
        return this.#keyLower ??= this.key.toLowerCase() ?? "";
    }
    #keyRegex;
    get keyRegex() {
        return this.#keyRegex ??= regex("i") `^${this.key}$`;
    }
    static from(args) { return new Arg(args); }
    /**
     * Creates a key value string.
     * undefined becomes key="", null becomes key="unset"
     */
    static toKeyValueString(key, value) {
        if (value === null)
            return `${key}="unset"`;
        if (value === undefined)
            return `${key}=""`;
        if (typeof (value) === "number")
            return `${key}="${value}"`;
        return `${key}=${quote(value, "smart")}`;
    }
}
