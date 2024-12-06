function getTermMultiplier(termData) {
    if (termData.minus) {
        return -5;
    }
    if (termData.plus) {
        return 5;
    }
    return 1;
}
function getNameMultiplier(included) {
    return included ? 2 : 1;
}
export class SearchScore {
    searchable;
    compScore;
    constructor(searchable, compScore) {
        this.searchable = searchable;
        this.compScore = compScore;
    }
    get bool() {
        if (this.minusMatches < 0) {
            return false;
        }
        return this.plusMatches === 0 ? this.otherMatches > 0 : this.otherMatches > -1;
    }
    hits = [];
    get minusMatches() {
        const indexes = this.terms.map((termData, index) => termData.minus ? index : -1).filter(i => i !== -1);
        if (!indexes.length) {
            return 0;
        }
        if (indexes.find(index => this.hits[index] > 0) !== undefined) {
            return -1;
        }
        return 1;
    }
    get otherMatches() {
        const indexes = this.terms.map((termData, index) => !termData.minus && !termData.plus ? index : -1).filter(i => i !== -1);
        if (!indexes.length) {
            return 0;
        }
        if (indexes.find(index => this.hits[index] > 0) !== undefined) {
            return 1;
        }
        return -1;
    }
    get plusMatches() {
        const indexes = this.terms.map((termData, index) => termData.plus ? index : -1).filter(i => i !== -1);
        if (!indexes.length) {
            return 0;
        }
        if (indexes.find(index => this.hits[index] === 0) !== undefined) {
            return -1;
        }
        return 1;
    }
    terms = [];
    get totalScore() {
        let score = 0;
        const searchableName = this.searchable.name;
        this.terms.forEach((term, index) => {
            const termMultiplier = getTermMultiplier(term);
            const hitsMultiplier = this.hits[index];
            const nameMultiplier = getNameMultiplier(searchableName.includes(term.term));
            score += termMultiplier * hitsMultiplier * nameMultiplier;
        });
        return score;
    }
    get totalHits() {
        return this.hits.reduce((total, current) => total + current, 0);
    }
    add(termData, hits) {
        const index = this.terms.findIndex(t => t.term === termData.term);
        if (index < 0) {
            this.terms.push(termData);
            this.hits.push(hits);
        }
        else {
            this.hits[index] += hits;
        }
    }
    append(...scores) {
        scores.forEach(score => score.terms.forEach((term, i) => this.add(term, score.hits[i])));
    }
    concat(...scores) {
        const newScore = new SearchScore(this.searchable);
        scores.forEach(score => score.terms.forEach((term, i) => newScore.add(term, score.hits[i])));
        return newScore;
    }
    fail() {
        this.add({ term: "!FAIL!", regex: null, plus: false, minus: true }, 1);
    }
}
