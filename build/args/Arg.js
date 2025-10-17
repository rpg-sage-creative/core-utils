import { regex } from "regex";
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
}
