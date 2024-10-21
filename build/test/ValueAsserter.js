import { AsserterBase } from "./internal/AsserterBase.js";
export class ValueAsserter extends AsserterBase {
    bigint() {
        return this.typeOf("bigint");
    }
    boolean() {
        return this.typeOf("boolean");
    }
    enum(enumObj) {
        const values = Object.values(enumObj);
        const numbers = values.filter(key => typeof (key) === "number");
        return this.in(numbers);
    }
    in(array) {
        return this._assert(array.includes(this.keyValue));
    }
    is(expected) {
        return this._assert(this.keyValue === expected);
    }
    number() {
        return this.typeOf("number");
    }
    snowflake() {
        if (typeof (this.keyValue) === "string") {
            const isSnowflake = this.keyValue.match(/^\d{16,}$/) !== null;
            return this._assert(isSnowflake);
        }
        return this._assert(false);
    }
    string() {
        return this.typeOf("string");
    }
    test(tester) {
        return this._assert(tester(this.keyValue));
    }
    typeOf(...types) {
        return this._assert(types.includes(typeof (this.keyValue)));
    }
}
