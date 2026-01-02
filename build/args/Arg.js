import { regex } from "regex";
import { quote } from "../string/index.js";
export class Arg {
    index;
    key;
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
