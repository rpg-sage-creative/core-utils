import { ArrayAsserter } from "./ArrayAsserter.js";
import { AsserterBase } from "./internal/AsserterBase.js";
import type { TAsserterParent } from "./internal/TAsserterParent.js";
import type { TObjectAsserter } from "./internal/TObjectAsserter.js";
import { ValueAsserter } from "./ValueAsserter.js";
export declare class ObjectAsserter<Value, Parent extends TAsserterParent = TAsserterParent> extends AsserterBase<Value, Parent> implements TObjectAsserter<Value> {
    assertMap: Map<string, boolean>;
    keySet: Set<string>;
    readMap: Map<string, boolean>;
    constructor(parent: Parent, key: string, keyValue: Value, optional: boolean);
    array<Child extends any = any>(key: keyof Value, optional?: boolean): ArrayAsserter<Child, this>;
    object<Child>(key: keyof Value, optional?: boolean): ObjectAsserter<Child, this>;
    assert(handler: (asserter: ObjectAsserter<any, any>) => void): Parent;
    value<Child>(key: keyof Value, optional?: boolean): ValueAsserter<Child, this>;
    setKeys(keys: (keyof Value)[]): this;
    setKeys<Key = keyof Value>(...keys: (keyof Value)[]): this;
    todo(): this;
    boolean(key: keyof Value, optional?: boolean): this;
    enum<Enum>(key: keyof Value, enumObj: Enum, optional?: boolean): this;
    number(key: keyof Value, optional?: boolean): this;
    snowflake(key: keyof Value, optional?: boolean): this;
    string(key: keyof Value, optional?: boolean): this;
}
