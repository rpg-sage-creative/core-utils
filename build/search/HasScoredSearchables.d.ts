import type { SearchScore } from "./SearchScore.js";
import type { Searchable } from "./Searchable.js";
export declare class HasScoredSearchables<T extends Searchable> {
    get count(): number;
    get isEmpty(): boolean;
    scores: SearchScore<T>[];
    get searchables(): T[];
    get theOne(): T | null;
    add(...scores: SearchScore<T>[]): void;
}
