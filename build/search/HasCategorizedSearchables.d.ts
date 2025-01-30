import type { Searchable } from "./Searchable.js";
type TCategorizedSearchables<T extends Searchable> = {
    children: TCategorizedSearchables<T>[];
    label: string;
    searchables: T[];
};
export declare class HasCategorizedSearchables<T extends Searchable> {
    protected _unsortedSearchables: T[];
    private _categories?;
    get categories(): string[];
    private _categorizedSearchables?;
    get categorizedSearchables(): TCategorizedSearchables<T>[];
    get categoryCount(): number;
    get isEmpty(): boolean;
    private _searchables?;
    get searchables(): T[];
    get searchableCount(): number;
    get theOne(): T | undefined;
    add(...searchables: T[]): void;
}
export {};
