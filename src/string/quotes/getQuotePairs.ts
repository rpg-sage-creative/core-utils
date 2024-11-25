/** Represents the characters (and their metadata) used in quoting comments, dialog, or string values. */
type QuotePair = {
	/** The two characters that make up the pair of quotes, ex: "" or '' or “” or ‘’ */
	chars: string;

	/** Specifies if this pair is considered single quotes. */
	isSingle: boolean;

	/** Specifies if this pair is considered double quotes. */
	isDouble: boolean;

	/** Specifies if this pair is considered fancy quotes. */
	isFancy: boolean;

	/** Specifies if this pair is valid but not normally used quotes. Ex: „” */
	isExtended: boolean;
};

/** Creates and returns an array of quote pairs and their attributes. */
export function getQuotePairs(): QuotePair[] {
	return [
		{ chars:`''`, isSingle:true,  isDouble:false, isFancy:false, isExtended:false },
		{ chars:`‘’`, isSingle:true,  isDouble:false, isFancy:true,  isExtended:false },
		{ chars:`""`, isSingle:false, isDouble:true,  isFancy:false, isExtended:false },
		{ chars:`“”`, isSingle:false, isDouble:true,  isFancy:true,  isExtended:false },
		{ chars:`„“`, isSingle:false, isDouble:true,  isFancy:false, isExtended:true  },
		{ chars:`„”`, isSingle:false, isDouble:true,  isFancy:false, isExtended:true  },
		// { chars:``, isSingle:false, isDouble:false, isFancy:false, isExtended:false },
	];
}