import { AsserterBase, type TAsserterBase, type TAsserterParent } from "./internal/index.js";
type ArrayOfTester<Value = any> = (value: Value) => boolean;
type ArrayIterator<ValueType, ArrayParent extends TAsserterParent, Asserter extends TAsserterBase> = (this: ArrayAsserter<ValueType, ArrayParent>, asserter: Asserter, index: number, array: ValueType[]) => unknown;
export declare class ArrayAsserter<Value, Parent extends TAsserterParent = TAsserterParent> extends AsserterBase<Value, Parent> implements TAsserterParent {
    assertMap: Map<string, boolean>;
    isArray: boolean;
    keySet: Set<string>;
    readMap: Map<string, boolean>;
    private get array();
    constructor(parent: Parent, key: string, keyValue: Value, optional: boolean);
    of(type: string): Parent;
    of<Value>(tester: ArrayOfTester<Value>): Parent;
    iterate(iterator: ArrayIterator<Value, Parent, any>): Parent;
}
export {};
