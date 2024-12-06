import type { Searchable } from "./Searchable.js";
export type SearchTermData = {
    term: string;
    regex: RegExp | null;
    plus: boolean;
    minus: boolean;
};
export declare class SearchScore<T extends Searchable> {
    searchable: T;
    compScore?: number | undefined;
    constructor(searchable: T, compScore?: number | undefined);
    /** All criteria has been met, no minus matches, all plus matches, any other matches */
    get bool(): boolean;
    hits: number[];
    /** -1 means exists and is bad, 0 means non-existent, 1 means exists and good */
    get minusMatches(): number;
    /** -1 means exists and is bad, 0 means non-existent, 1 means exists and good */
    get otherMatches(): number;
    /** -1 means exists and is bad, 0 means non-existent, 1 means exists and good */
    get plusMatches(): number;
    terms: SearchTermData[];
    get totalScore(): number;
    get totalHits(): number;
    add(termData: SearchTermData, hits: number): void;
    append(...scores: SearchScore<T>[]): void;
    concat(...scores: SearchScore<T>[]): SearchScore<T>;
    fail(): void;
}
