import { HasCache } from "../cache/HasCache.js";
/** The most basic Core used. */
export type Core<ObjectType extends string = string> = {
    /** The type of data that is represented. Often the Class that the Core is for. */
    objectType: ObjectType;
};
/** Abstract Class with properties and methods related to the Core or objectType */
export declare abstract class HasCore<TypedCore extends Core<ObjectType>, ObjectType extends string = string> extends HasCache {
    protected core: TypedCore;
    /** Must have a core. */
    constructor(core: TypedCore);
    [Symbol.toStringTag](): ObjectType;
    /** The type of data that is represented. Often the Class that the Core is for. */
    get objectType(): ObjectType;
    /** Returns true if the given object is this object or this object's core. */
    is(value: TypedCore | HasCore<TypedCore, ObjectType>): boolean;
    /** Returns this object's core. */
    toJSON(): TypedCore;
    static toJSON<TypedCore extends Core<ObjectType>, ObjectType extends string = string, TypedObject extends HasCore<TypedCore> = HasCore<TypedCore>, TypedObjectOrCore extends TypedCore | TypedObject = TypedCore | TypedObject>(objectOrCore: TypedObjectOrCore): TypedCore;
}
