import { ObjectAsserter } from "./ObjectAsserter.js";
export declare class JsonAsserter<Value> extends ObjectAsserter<Value, any> {
    json: Value;
    objectType: string;
    constructor(json: Value, objectType: string);
    static for<T>(json: T, objectType: string, keys: (keyof T)[]): JsonAsserter<T>;
}
