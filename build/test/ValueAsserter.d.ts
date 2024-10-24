import { AsserterBase } from "./internal/AsserterBase.js";
import type { TAsserterParent } from "./internal/TAsserterParent.js";
export declare class ValueAsserter<Value, Parent extends TAsserterParent> extends AsserterBase<Value, Parent> {
    bigint(): Parent;
    boolean(): Parent;
    enum<Enum>(enumObj: Enum): Parent;
    in(array: Value[]): Parent;
    is(expected: Value): Parent;
    number(): Parent;
    snowflake(): Parent;
    string(): Parent;
    test(tester: (value: any) => boolean): Parent;
    /** Asserts that the value's type is that of the given type. */
    typeOf(type: string): Parent;
    /** Asserts that the value's type is one of the given types. */
    typeOf(...types: string[]): Parent;
}
