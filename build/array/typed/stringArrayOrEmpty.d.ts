import { type Optional } from "@rsc-utils/type-utils";
type Options = {
    /** default: "," */
    splitter?: string | RegExp;
    /** default: stringOrUndefined */
    mapper?: (value: string) => Optional<string>;
    /** default: isDefined */
    filter?: (value: Optional<string>) => value is string;
};
export declare function stringArrayOrEmpty(value: Optional<string>, opts?: Options): string[];
export {};
