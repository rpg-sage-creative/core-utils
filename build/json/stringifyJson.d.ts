/**
 * BigInt and Date friendly replacement for JSON.stringify().
 */
export declare function stringifyJson(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
export declare function stringifyJson(value: any, replacer?: (string | number)[] | null, space?: string | number): string;
/** @deprecated use stringifyJson() */
export declare const stringify: typeof stringifyJson;
