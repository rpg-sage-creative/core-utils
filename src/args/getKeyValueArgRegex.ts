import { regex, rewrite } from "regex";
import { getWordCharacterRegex, type RegexWordCharOptions } from "../characters/getWordCharacterRegex.js";
import { captureRegex } from "../regex/captureRegex.js";
import { getOrCreateRegex } from "../regex/internal/getOrCreateRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpCreateOptions, RegExpQuantifyOptions } from "../regex/RegExpOptions.js";
import { getQuotedRegex, getQuotePairs, type RegExpQuoteOptions } from "../string/index.js";
import { anchorRegex } from "../regex/anchorRegex.js";

/**
 * strict:  spaces around the pair: required, quotes: required
 * default: spaces around the pair: required, quotes: optional
 * sloppy:  spaces around the pair: optional, quotes: optional
 */
type KeyValueArgMode = "default" | "strict" | "sloppy";

type Options = RegExpCreateOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegExpQuantifyOptions & {
	/** Specifiies a key literal or a pattern based the options. */
	key?: string | RegexWordCharOptions;

	/** Specifies if quotes are required or if we can allow spaces around the equals (=) sign. */
	mode?: KeyValueArgMode;

	/** Specifies the options used when creating the quoted regex. */
	quotes?: RegExpQuoteOptions;
};

type RegExpByModeOptions = {
	capture?: string;
	iFlag?: "" | "i";
	keyRegex: string | RegExp;
	mode?: KeyValueArgMode;
	quotedRegex: RegExp;
};

function createStrictRegex({ iFlag, keyRegex, quotedRegex }: RegExpByModeOptions): RegExp {
	return regex(iFlag)`
		(?<=(^|\s))     # start of line or whitespace
		${keyRegex}
		=
		${quotedRegex}
		(?=(\s|$))      # whitespace or end of line
	`;
}

function createDefaultRegex({ iFlag, keyRegex, quotedRegex }: RegExpByModeOptions): RegExp {
	const quotePairs = getQuotePairs();
	const leftQuoteChars = quotePairs.map(pair => pair.chars[0]).join("");
	const notLeftQuoteNorSpaceRegexp = new RegExp(`[^\\s\\n\\r${leftQuoteChars}]`, iFlag);
	return regex(iFlag)`
		(?<=(^|\s))     # start of line or whitespace
		${keyRegex}
		=
		(
			${quotedRegex}
			|
			${notLeftQuoteNorSpaceRegexp}\S+  # unquoted value that doesn't start with left quote and has no spaces
		)
		(?=(\s|$))      # whitespace or end of line
	`;
}

function createSloppyRegex({ iFlag, keyRegex, quotedRegex }: RegExpByModeOptions): RegExp {
	const quotePairs = getQuotePairs();
	const rightQuoteChars = quotePairs.map(pair => pair.chars[1]).join("|");
	const startBoundary = new RegExp(`^|\\s|${rightQuoteChars}`, iFlag);

	const leftQuoteChars = quotePairs.map(pair => pair.chars[0]).join("");
	const notLeftQuoteNorSpaceRegexp = new RegExp(`[^\\s\\n\\r${leftQuoteChars}]`, iFlag);

	return regex(iFlag)`
		(?<=${startBoundary})  # start of line or whitespace or a right quote
		${keyRegex}
		(
			\s*=\s*${quotedRegex}              # allow spaces around = only if the value is quoted; also captures the only quoted ("strict") values
			|
			=${notLeftQuoteNorSpaceRegexp}\S+  # allow an unquoted no-space value as long as it doesn't start with a left quote
			(?=(\s|$))                         # whitespace or end of line
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
	const { anchored, capture, gFlag = "", iFlag = "i", key, quotes } = options ?? {};
	const { quantifier = "*", style = "any" } = quotes ?? {};
	const mode = style !== "any" ? "strict" : options?.mode;

	let keyRegex: RegExp | string;
	if (typeof(key) === "string") {
		const tester = getWordCharacterRegex({ iFlag, quantifier:"+", allowDashes:true, allowPeriods:true });
		if (tester.exec(key)?.[0] !== key) {
			throw new RangeError(`Invalid keyValueArg key`);
		}
		keyRegex = key;
	}else {
		keyRegex = getWordCharacterRegex({ iFlag, quantifier:"+", ...key });
	}

	const quotedRegex = getQuotedRegex({ iFlag, quantifier, style });
	const keyValueArgRegex = getRegexByMode({ iFlag, keyRegex, mode, quotedRegex });

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
 * Default options: { capture:undefined, gFlag:"", iFlag:"i", key:undefined, mode:"default", quotes:{ quantifier:"*", style:undefined } }
 */
export function getKeyValueArgRegex(options?: Options): RegExp {
	return getOrCreateRegex(createKeyValueArgRegex, options);
}
