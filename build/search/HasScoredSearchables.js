import { sortPrimitive } from "../array/index.js";
function sortByCompScore(a, b) {
    return sortPrimitive(b.compScore ?? 0, a.compScore ?? 0)
        || sortPrimitive(b.totalScore, a.totalScore)
        || sortPrimitive(a.searchable.name, b.searchable.name);
}
function searchableToLabel(score) {
    const category = score.searchable.searchResultCategory, source = score.searchable?.source?.code;
    if (category) {
        return `${score.searchable.toSearchResult()}${source} - ${category}`;
    }
    return `${score.searchable.toSearchResult()}${source}`;
}
export class HasScoredSearchables {
    get count() {
        return this.scores.length;
    }
    get isEmpty() {
        return !this.scores.length;
    }
    scores = [];
    get searchables() {
        return this.scores.map(score => score.searchable);
    }
    get theOne() {
        return this.scores.length === 1 ? this.scores[0]?.searchable : undefined;
    }
    add(...scores) {
        const labels = this.scores.map(score => searchableToLabel(score));
        scores.forEach(score => {
            const label = searchableToLabel(score);
            if (!labels.includes(label)) {
                this.scores.push(score);
            }
        });
        this.scores.sort(sortByCompScore);
    }
}
