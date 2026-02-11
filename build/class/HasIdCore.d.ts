import { type Snowflake, type UUID } from "@rsc-utils/id-utils";
import type { Matcher } from "@rsc-utils/type-utils";
import { HasCore, type Core } from "./HasCore.js";
/** Represents an object that has an ID. */
type HasId<IdType extends string = string> = {
    /** The unique identifier for this object. */
    id: IdType;
    /** @deprecated transitional holder until all objects are converted to id as Snowflake */
    did?: Snowflake;
    /** @deprecated transitional holder until all objects are converted to id as Snowflake */
    uuid?: UUID;
};
/** The second most basic Core used. */
export type IdCore<ObjectType extends string = string, IdType extends string = string> = Core<ObjectType> & HasId<IdType>;
/** Abstract Class with properties and methods related to the id. */
export declare abstract class HasIdCore<TypedCore extends IdCore<ObjectType>, ObjectType extends string = string, IdType extends string = string> extends HasCore<TypedCore, ObjectType> {
    /** The unique identifier for this object. */
    get id(): IdType;
    /** Used to cache the SnowflakeMatcher or UuidMatcher used for .equals(). */
    private _idMatcher?;
    /** Used to cache the SnowflakeMatcher or UuidMatcher used for .equals(). */
    protected get idMatcher(): Matcher;
    /** @deprecated Used to cache the SnowflakeMatcher used for .equals(). */
    private _didMatcher?;
    /** @deprecated Used to cache the SnowflakeMatcher used for .equals(). */
    protected get didMatcher(): Matcher;
    /** @deprecated Used to cache the UuidMatcher used for .equals(). */
    private _uuidMatcher?;
    /** @deprecated Used to cache the UuidMatcher used for .equals(). */
    protected get uuidMatcher(): Matcher;
    /** Returns true if the given object represents this object, it's core, or it's id. */
    equals(other: string | IdType | Matcher | HasIdCore<any> | null | undefined): boolean;
}
export {};
