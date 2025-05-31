export type KeyValuePair<T extends string = string, U extends string = string> = {
	/** key for the flag or pair */
	key: T;
	/** arg for ValueArg, value for a KeyValueArg; null for pair with empty string, undefined for a flag */
	value: U | null;
}

export type FlagArg<T extends string = string> = {
	/** raw arg text */
	arg: T;
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
	key: string;
	/** key.toLowerCase() */
	keyLower: string;
	/** how to increment/decrement */
	modifier?: never;
	/** arg for ValueArg, value for a KeyValueArg; null for pair with empty string, undefined for a flag */
	value?: never;
};

export type IncrementArg<T extends string = string, U extends string = string> = {
	/** raw arg text */
	arg: T;
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
	key: string;
	/** key.toLowerCase() */
	keyLower: string;
	/** how to increment/decrement */
	operator: "+" | "-";
	/** arg for ValueArg, value for a KeyValueArg; null for pair with empty string, undefined for a flag */
	value: U | null;
};

export type KeyValueArg<T extends string = string, U extends string = string> = KeyValuePair<T, U> & {
	/** raw arg text */
	arg: T;
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
	key: string;
	/** key.toLowerCase() */
	keyLower: string;
	/** how to increment/decrement */
	modifier?: never;
	/** arg for ValueArg, value for a KeyValueArg; null for pair with empty string, undefined for a flag */
	value: U | null;
};

export type ValueArg<T extends string = string> = {
	/** raw arg text */
	arg: T;
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
	/** key.toLowerCase() */
	keyLower?: never;
	/** how to increment/decrement */
	modifier?: never;
	/** arg for ValueArg, value for a KeyValueArg; null for pair with empty string, undefined for a flag */
	value: T | null;
};