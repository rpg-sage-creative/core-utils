import { sortPrimitive } from "../array/index.js";
function partitionCategorizedSearchables(searchables, categoryParser) {
    const categorized = searchables.reduce((array, searchable) => {
        const searchableCategory = categoryParser(searchable);
        let category = array.find(cat => cat.label === searchableCategory);
        if (!category) {
            category = { label: searchableCategory, searchables: [], children: [] };
            array.push(category);
        }
        category.searchables.push(searchable);
        return array;
    }, []);
    categorized.forEach(category => {
        category.searchables.sort(sortByName);
        return category.searchables;
    });
    return categorized;
}
function sortByLabel(a, b) {
    return sortPrimitive(a.label, b.label);
}
function sortByName(a, b) {
    return sortPrimitive(a.name, b.name);
}
function sortByCountThenLabel(a, b) {
    return sortPrimitive(b.searchables.length, a.searchables.length)
        || sortPrimitive(a.label, b.label);
}
export class HasCategorizedSearchables {
    _unsortedSearchables = [];
    _categories;
    get categories() {
        return this._categories ?? (this._categories = this.categorizedSearchables.map(cat => cat.label));
    }
    _categorizedSearchables;
    get categorizedSearchables() {
        if (!this._categorizedSearchables) {
            this._categorizedSearchables = partitionCategorizedSearchables(this._unsortedSearchables, searchable => searchable.searchResultCategory);
            this._categorizedSearchables.sort(sortByCountThenLabel);
            this._categorizedSearchables.forEach(category => {
                category.children = partitionCategorizedSearchables(category.searchables, searchable => searchable.name[0]);
                category.children.sort(sortByLabel);
            });
        }
        return this._categorizedSearchables;
    }
    get categoryCount() {
        return this.categories.length;
    }
    get isEmpty() {
        return !this._unsortedSearchables.length;
    }
    _searchables;
    get searchables() {
        return this._searchables ?? (this._searchables = this.categorizedSearchables.reduce((array, category) => array.concat(category.searchables), []));
    }
    get searchableCount() {
        return this._unsortedSearchables.length;
    }
    get theOne() {
        return this._unsortedSearchables.length === 1 ? this._unsortedSearchables[0] : undefined;
    }
    add(...searchables) {
        searchables.forEach(searchable => this._unsortedSearchables.push(searchable));
        delete this._searchables;
        delete this._categorizedSearchables;
        delete this._categories;
    }
}
