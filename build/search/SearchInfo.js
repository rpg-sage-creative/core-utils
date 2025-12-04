import { pattern, regex } from "regex";
import { toUniqueDefined } from "../array/index.js";
import { oneToUS } from "../language/oneToUs.js";
import { reduceNoiseUS } from "../language/reduceNoiseUS.js";
import { cleanWhitespace, dequote, QuotedContentRegExp } from "../string/index.js";
import { tokenize } from "../string/tokenize.js";
import { SearchScore } from "./SearchScore.js";
function createTerms(searchInfo, term, regexFlag) {
    const tokens = tokenize(term, { quoted: QuotedContentRegExp, other: /\S+/ });
    const terms = tokens.map(token => token.token).map(dequote).filter(toUniqueDefined);
    return reduceNoiseUS(terms).map(_term => {
        const minus = _term.startsWith("-");
        const plus = _term.startsWith("+");
        const cleanTerm = oneToUS(minus || plus ? _term.slice(1) : _term);
        if (minus) {
            searchInfo.hasMinus = true;
        }
        if (plus) {
            searchInfo.hasPlus = true;
        }
        return {
            term: cleanTerm,
            regex: regex("gi") `${regexFlag ? pattern `${cleanTerm}` : cleanTerm}`,
            plus: plus,
            minus: minus
        };
    });
}
const MatchFlagRegExp = /\s\-[gr]*$/i;
const CollapseModifierRegExp = /([\+\-])\s+(\w)/gi;
export class SearchInfo {
    searchText;
    globalFlag;
    hasMinus = false;
    hasPlus = false;
    keyTerm;
    terms;
    constructor(searchText, flags) {
        this.searchText = searchText;
        this.globalFlag = ((searchText.match(MatchFlagRegExp) ?? [])[0] ?? "").includes("g") || flags.includes("g");
        const regexFlag = ((searchText.match(MatchFlagRegExp) ?? [])[0] ?? "").includes("r") || flags.includes("r");
        const term = cleanWhitespace(searchText.replace(MatchFlagRegExp, "")).replace(CollapseModifierRegExp, `$1$2`).trim();
        if (this.globalFlag) {
            this.terms = createTerms(this, term, regexFlag);
        }
        else {
            this.terms = [{
                    term: term,
                    regex: regex("gi") `${regexFlag ? pattern `${term}` : term}`,
                    plus: false,
                    minus: false
                }];
        }
    }
    clone(object) {
        return clone("core", object, this);
    }
    mark(content) {
        return content;
    }
    score(searchable, ...args) {
        const contents = args.flat(Infinity).filter(toUniqueDefined), score = new SearchScore(searchable);
        this.terms.forEach(termInfo => {
            const mapped = contents.map(s => (termInfo.regex ? s.match(termInfo.regex) ?? [] : []).length);
            const reduced = mapped.reduce((sum, count) => sum + count, 0);
            score.add(termInfo, reduced);
        });
        return score;
    }
    test(...args) {
        return this.score(null, ...args).bool;
    }
}
function clone(objectKey, object, searchInfo, clones = []) {
    if (object === undefined || object === null) {
        return object;
    }
    if (object instanceof Date) {
        return new Date(object);
    }
    switch (typeof (object)) {
        case "string": return objectKey === "name" || searchInfo.globalFlag ? searchInfo.mark(object) : object;
        case "number":
        case "boolean": return object;
        case "function": return Error("Cannot clone a function.");
        default: break;
    }
    return _clone(objectKey, object, searchInfo, clones);
}
function _clone(objectKey, object, searchInfo, clones) {
    const pair = clones.find(c => c.original === object);
    let cloned = pair && pair.clone || null;
    if (cloned === null) {
        if (Array.isArray(object)) {
            cloned = [];
            clones.push({ original: object, clone: cloned });
            object.forEach((o, i) => cloned[i] = clone(objectKey, o, searchInfo, clones));
        }
        else if (typeof (object.clone) === "function") {
            cloned = object.clone();
        }
        else {
            cloned = {};
            clones.push({ original: object, clone: cloned });
            Object.keys(object).forEach(key => {
                if (object.hasOwnProperty(key)) {
                    cloned[key] = clone(key, object[key], searchInfo, clones);
                }
            });
        }
    }
    return cloned;
}
