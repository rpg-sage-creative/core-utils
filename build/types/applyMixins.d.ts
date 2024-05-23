type Constructor = new (...args: any[]) => {};
type ConflictResolutionMethod = "all" | "mixin" | "none";
type MixinOptions = {
    /** use process.exit(1) if a conflict is found; defaults to true */
    exitOnConflict?: boolean;
    /** when to log the property map; defaults to "conflict" */
    logPropertyMap?: true | false | "conflict";
    /** how to handle conflicts; defaults to "mixin" */
    resolutionMethod?: ConflictResolutionMethod;
};
export declare function applyMixins(ctor: Constructor, mixins: any[], options?: MixinOptions): void;
export {};
