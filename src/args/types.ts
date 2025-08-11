export type KeyValuePair<Value extends number | string, Nil extends null | undefined> = {
	/** the key as found */
	key: string;
	/** if the value is an empty string then Nil is returned */
	value: Value | Nil;
};

export type KeyValueTrio<Value extends number | string, Nil extends null | undefined> = {
	/** the key as found */
	key: string;
	/** used for comparisons: key.toLowerCase() */
	keyLower: Lowercase<string>;
	/** if the value is an empty string then Nil is returned */
	value: Value | Nil;
};

export type KeyValueRegex<Value extends number | string, Nil extends null | undefined> = {
	/** the key as found */
	key: string;
	/** regex for comparing the key: new RegExp(`^${key}$`, "i") */
	keyRegex: RegExp;
	/** if the value is an empty string then Nil is returned */
	value: Value | Nil;
};

export type KeyValueQuad<Value extends number | string, Nil extends null | undefined> = {
	/** the key as found */
	key: string;
	/** used for comparisons: key.toLowerCase() */
	keyLower: Lowercase<string>;
	/** regex for comparing the key: new RegExp(`^${key}$`, "i") */
	keyRegex: RegExp;
	/** if the value is an empty string then Nil is returned */
	value: Value | Nil;
};

export type FlagArg<Key extends string = string> = {
	/** raw arg text */
	arg: string;
	/** index of the arg in the args array */
	index: number;
	/** does the arg start with a dash? */
	isFlag: true;
	/** is the arg key+= or key-= or key++ or key-- */
	isIncrement?: never;
	/** is the arg a value key/value pair? */
	isKeyValue?: never;
	/** is the arg a raw value arg */
	isValue?: never;
	/** key for the flag or pair */
	key: Key;
	/** regex for comparing the key */
	keyRegex: RegExp;
	/** how to increment/decrement */
	modifier?: never;
	/** arg for ValueArg, value for a KeyValueArg; null for pair with empty string, undefined for a flag */
	value?: never;
};

export type IncrementArg<Key extends string = string, Value extends number | string = string, Nil extends null | undefined | never = null> = {
	/** raw arg text */
	arg: string;
	/** index of the arg in the args array */
	index: number;
	/** does the arg start with a dash? */
	isFlag?: never;
	/** is the arg key+= or key-= or key++ or key-- */
	isIncrement: true;
	/** is the arg a value key/value pair? */
	isKeyValue?: never;
	/** is the arg a raw value arg */
	isValue?: never;
	/** key for the flag or pair */
	key: Key;
	/** regex for comparing the key */
	keyRegex: RegExp;
	/** how to increment/decrement */
	operator: "+" | "-";
	/** arg for ValueArg, value for a KeyValueArg; null for pair with empty string, undefined for a flag */
	value: Value | Nil;
};

export type KeyValueArg<Key extends string = string, Value extends number | string = string, Nil extends null | undefined | never = null> = {
	/** raw arg text */
	arg: string;
	/** index of the arg in the args array */
	index: number;
	/** does the arg start with a dash? */
	isFlag?: never;
	/** is the arg key+= or key-= or key++ or key-- */
	isIncrement?: never;
	/** is the arg a value key/value pair? */
	isKeyValue?: true;
	/** is the arg a raw value arg */
	isValue?: never;
	/** key for the flag or pair */
	key: Key;
	/** regex for comparing the key */
	keyRegex: RegExp;
	/** how to increment/decrement */
	modifier?: never;
	/** arg for ValueArg, value for a KeyValueArg; null for pair with empty string, undefined for a flag */
	value: Value | Nil;
};

export type ValueArg<Value extends number | string = string, Nil extends null | undefined | never = null> = {
	/** raw arg text */
	arg: string;
	/** index of the arg in the args array */
	index: number;
	/** does the arg start with a dash? */
	isFlag?: never;
	/** is the arg key+= or key-= or key++ or key-- */
	isIncrement?: never;
	/** is the arg a value key/value pair? */
	isKeyValue?: never;
	/** is the arg a raw value arg */
	isValue?: true;
	/** key for the flag or pair */
	key?: never;
	/** regex for comparing the key */
	keyRegex?: never;
	/** how to increment/decrement */
	modifier?: never;
	/** arg for ValueArg, value for a KeyValueArg; null for pair with empty string, undefined for a flag */
	value: Value | Nil;
};