import { SearchScore, type SearchTermData } from "./SearchScore.js";
import type { Searchable } from "./Searchable.js";
type TSearchableContent = string | string[] | undefined;
export type TSearchFlag = "" | "g" | "r" | "gr" | "rg";
export declare class SearchInfo {
    searchText: string;
    globalFlag: boolean;
    hasMinus: boolean;
    hasPlus: boolean;
    keyTerm: string | undefined;
    terms: SearchTermData[];
    constructor(searchText: string, flags: TSearchFlag);
    clone<T>(object: T): T;
    mark(content: string): string;
    mark(content: string[]): string[];
    score<T extends Searchable>(searchable: T, ...args: TSearchableContent[]): SearchScore<T>;
    test(...args: TSearchableContent[]): boolean;
}
export {};
