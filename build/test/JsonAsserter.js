import { ObjectAsserter } from "./ObjectAsserter.js";
export class JsonAsserter extends ObjectAsserter {
    json;
    objectType;
    constructor(json, objectType) {
        super({}, objectType, json, false);
        this.json = json;
        this.objectType = objectType;
    }
    static for(json, objectType, keys) {
        return new JsonAsserter(json, objectType).setKeys(keys);
    }
}
