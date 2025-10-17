import type { FlagArg, IncrementArg, KeyValueArg } from "./types.js";
/**
 * Underling class for FlagArg, IncrementArg, and KeyValueArg.
 * Primary purpose is to have keyLower and keyRegex available on demand, cached after first use.
 */
export declare class Arg {
    #private;
    index: number;
    key: string;
    private constructor();
    get keyLower(): Lowercase<string>;
    get keyRegex(): RegExp;
    static from(args: Omit<FlagArg, "index" | "keyLower" | "keyRegex"> & {
        index?: number;
    }): FlagArg;
    static from(args: Omit<IncrementArg, "index" | "keyLower" | "keyRegex"> & {
        index?: number;
    }): IncrementArg;
    static from(args: Omit<KeyValueArg, "index" | "keyLower" | "keyRegex"> & {
        index?: number;
    }): KeyValueArg;
}
