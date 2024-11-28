import { regex, rewrite } from "regex";
import { getWordCharacterRegex, type RegexWordCharOptions } from "../characters/getWordCharacterRegex.js";
import { anchorRegex } from "../regex/anchorRegex.js";
import { captureRegex } from "../regex/captureRegex.js";
import { getOrCreateRegex } from "../regex/internal/getOrCreateRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpCreateOptions } from "../regex/RegExpOptions.js";
import { getQuotedRegex, getQuotePairs, type RegExpQuoteOptions } from "../string/index.js";

/**
 * strict:  spaces around the pair: required, quotes: required
 * default: spaces around the pair: required, quotes: optional
 * sloppy:  spaces around the pair: optional, quotes: optional
 */
export type KeyValueArgMode = "default" | "strict" | "sloppy";

type Options = RegExpCreateOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegexWordCharOptions & RegExpQuoteOptions & {
	/** Specifiies a key literal. */
	key?: string;

	/** Specifies if quotes are required or if we can allow spaces around the equals (=) sign. */
	mode?: KeyValueArgMode;

};

type RegExpByModeOptions = {
	capture?: string;
	iFlag?: "" | "i";
	keyRegex: string | RegExp;
	mode?: KeyValueArgMode;
	quotedRegex: RegExp;
};

function createStrictRegex({ capture, iFlag, keyRegex, quotedRegex }: RegExpByModeOptions): RegExp {
	if (capture) {
		return regex(iFlag)`
			(?<=(^|\s))         # start of line or whitespace
			(?<${capture}Key>${keyRegex})
			=
			(?<${capture}QuotedValue>${quotedRegex})
			(?=(\s|$))      # whitespace or end of line
		`;
	}
	return regex(iFlag)`
		(?<=(^|\s))     # start of line or whitespace
		${keyRegex}
		=
		${quotedRegex}
		(?=(\s|$))      # whitespace or end of line
	`;
}

function createDefaultRegex({ capture, iFlag, keyRegex, quotedRegex }: RegExpByModeOptions): RegExp {
	const quotePairs = getQuotePairs();
	const leftQuoteChars = quotePairs.map(pair => pair.chars[0]).join("");
	const noLeftQuoteNoSpaceRegexp = new RegExp(`[^\\s\\n\\r${leftQuoteChars}]`, iFlag);
	if (capture) {
		return regex(iFlag)`
			(?<=(^|\s))     # start of line or whitespace
			(?<${capture}Key>${keyRegex})
			=
			(
				(?<${capture}QuotedValue>${quotedRegex})
				|
				(?<${capture}NakedValue>${noLeftQuoteNoSpaceRegexp}\S*)  # unquoted value that doesn't start with left quote and has no spaces
			)
			(?=(\s|$))      # whitespace or end of line
		`;
	}
	return regex(iFlag)`
		(?<=(^|\s))     # start of line or whitespace
		${keyRegex}
		=
		(
			${quotedRegex}
			|
			${noLeftQuoteNoSpaceRegexp}\S*  # unquoted value that doesn't start with left quote and has no spaces
		)
		(?=(\s|$))      # whitespace or end of line
	`;
}

function createSloppyRegex({ capture, iFlag, keyRegex, quotedRegex }: RegExpByModeOptions): RegExp {
	const quotePairs = getQuotePairs();
	const rightQuoteChars = quotePairs.map(pair => pair.chars[1]).join("");
	const startBoundary = new RegExp(`[\\s${rightQuoteChars}^]`, iFlag);

	const leftQuoteChars = quotePairs.map(pair => pair.chars[0]).join("");
	const noLeftQuoteNoSpaceRegexp = new RegExp(`[^\\s\\n\\r${leftQuoteChars}]`, iFlag);

	if (capture) {
		return regex(iFlag)`
			(?<=${startBoundary})                                    # start of line or whitespace or a right quote
			(?<${capture}Key>${keyRegex})
			(
				\s*=\s*(?<${capture}QuotedValue>${quotedRegex})            # allow spaces around = only if the value is quoted; also captures the only quoted ("strict") values
				|
				=(?<${capture}NakedValue>${noLeftQuoteNoSpaceRegexp}\S*)  # allow an unquoted no-space value as long as it doesn't start with a left quote
				(?=(\s|$))                                           # whitespace or end of line
			)
		`;
	}

	return regex(iFlag)`
		(?<=${startBoundary})                # start of line or whitespace or a right quote
		${keyRegex}
		(
			\s*=\s*${quotedRegex}            # allow spaces around = only if the value is quoted; also captures the only quoted ("strict") values
			|
			=${noLeftQuoteNoSpaceRegexp}\S*  # allow an unquoted no-space value as long as it doesn't start with a left quote
			(?=(\s|$))                       # whitespace or end of line
		)
	`;
}

function getRegexByMode(options: RegExpByModeOptions): RegExp {
	switch(options.mode) {
		case "sloppy": return createSloppyRegex(options);
		case "strict": return createStrictRegex(options);
		default: return createDefaultRegex(options);
	}
}

/** Creates a new instance of the KeyValueArg regex based on options. */
function createKeyValueArgRegex(options?: Options): RegExp {
	const { allowDashes, allowPeriods, anchored, capture, gFlag = "", iFlag = "i", key, quantifier = "*", style = "any" } = options ?? {};
	const mode = style !== "any" ? "strict" : options?.mode;

	let keyRegex: RegExp | string;
	if (key) {
		const tester = getWordCharacterRegex({ iFlag, quantifier:"+", allowDashes:true, allowPeriods:true });
		if (tester.exec(key)?.[0] !== key) {
			throw new RangeError(`Invalid keyValueArg key`);
		}
		keyRegex = key;
	}else {
		keyRegex = getWordCharacterRegex({ iFlag, quantifier:"+", allowDashes, allowPeriods });
	}

	const quotedRegex = getQuotedRegex({ iFlag, quantifier, style });
	const keyValueArgRegex = getRegexByMode({ capture, iFlag, keyRegex, mode, quotedRegex });

	const capturedRegex = capture
		? captureRegex(keyValueArgRegex, capture)
		: keyValueArgRegex;

	const anchoredRegex = anchored
		? anchorRegex(capturedRegex)
		: capturedRegex;

	const { expression, flags } = rewrite(anchoredRegex.source, { flags:gFlag + iFlag });
	return new RegExp(expression, flags);
}

/**
 * Returns an instance of the KeyValueArg regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { allowDashes:false, allowPeriods:false, capture:undefined, gFlag:"", iFlag:"i", key:undefined, mode:"default", quantifier:"*", style:undefined }
 * Setting style to anything other than "any" forces mode to "strict".
 */
export function getKeyValueArgRegex(options?: Options): RegExp {
	return getOrCreateRegex(createKeyValueArgRegex, options);
}
