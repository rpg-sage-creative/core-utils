import { regex, rewrite } from "regex";
import { getWordCharacterRegex } from "../characters/getWordCharacterRegex.js";
import { captureRegex } from "../regex/captureRegex.js";
import { getOrCreateRegex } from "../regex/internal/getOrCreateRegex.js";
import { getQuotedRegex, getQuotePairs } from "../string/index.js";
import { anchorRegex } from "../regex/anchorRegex.js";
function createStrictRegex({ capture, iFlag, keyRegex, quotedRegex }) {
    if (capture) {
        return regex(iFlag) `
			(?<=(^|\s))         # start of line or whitespace
			(?<${capture}Key>${keyRegex})
			=
			(?<${capture}QuotedValue>${quotedRegex})
			(?=(\s|$))      # whitespace or end of line
		`;
    }
    return regex(iFlag) `
		(?<=(^|\s))     # start of line or whitespace
		${keyRegex}
		=
		${quotedRegex}
		(?=(\s|$))      # whitespace or end of line
	`;
}
function createDefaultRegex({ capture, iFlag, keyRegex, quotedRegex }) {
    const quotePairs = getQuotePairs();
    const leftQuoteChars = quotePairs.map(pair => pair.chars[0]).join("");
    const noLeftQuoteNoSpaceRegexp = new RegExp(`[^\\s\\n\\r${leftQuoteChars}]`, iFlag);
    if (capture) {
        return regex(iFlag) `
			(?<=(^|\s))     # start of line or whitespace
			(?<${capture}Key>${keyRegex})
			=
			(
				(?<${capture}QuotedValue>${quotedRegex})
				|
				(?<${capture}NakedValue>${noLeftQuoteNoSpaceRegexp}\S+)  # unquoted value that doesn't start with left quote and has no spaces
			)
			(?=(\s|$))      # whitespace or end of line
		`;
    }
    return regex(iFlag) `
		(?<=(^|\s))     # start of line or whitespace
		${keyRegex}
		=
		(
			${quotedRegex}
			|
			${noLeftQuoteNoSpaceRegexp}\S+  # unquoted value that doesn't start with left quote and has no spaces
		)
		(?=(\s|$))      # whitespace or end of line
	`;
}
function createSloppyRegex({ capture, iFlag, keyRegex, quotedRegex }) {
    const quotePairs = getQuotePairs();
    const rightQuoteChars = quotePairs.map(pair => pair.chars[1]).join("|");
    const startBoundary = new RegExp(`^|\\s|${rightQuoteChars}`, iFlag);
    const leftQuoteChars = quotePairs.map(pair => pair.chars[0]).join("");
    const noLeftQuoteNoSpaceRegexp = new RegExp(`[^\\s\\n\\r${leftQuoteChars}]`, iFlag);
    if (capture) {
        return regex(iFlag) `
			(?<=${startBoundary})                                    # start of line or whitespace or a right quote
			(?<${capture}Key>${keyRegex})
			(
				\s*=\s*(?<${capture}QuotedValue>${quotedRegex})            # allow spaces around = only if the value is quoted; also captures the only quoted ("strict") values
				|
				=(?<${capture}NakedValue>${noLeftQuoteNoSpaceRegexp}\S+)  # allow an unquoted no-space value as long as it doesn't start with a left quote
				(?=(\s|$))                                           # whitespace or end of line
			)
		`;
    }
    return regex(iFlag) `
		(?<=${startBoundary})                # start of line or whitespace or a right quote
		${keyRegex}
		(
			\s*=\s*${quotedRegex}            # allow spaces around = only if the value is quoted; also captures the only quoted ("strict") values
			|
			=${noLeftQuoteNoSpaceRegexp}\S+  # allow an unquoted no-space value as long as it doesn't start with a left quote
			(?=(\s|$))                       # whitespace or end of line
		)
	`;
}
function getRegexByMode(options) {
    switch (options.mode) {
        case "sloppy": return createSloppyRegex(options);
        case "strict": return createStrictRegex(options);
        default: return createDefaultRegex(options);
    }
}
function createKeyValueArgRegex(options) {
    const { anchored, capture, gFlag = "", iFlag = "i", key, quotes } = options ?? {};
    const { quantifier = "*", style = "any" } = quotes ?? {};
    const mode = style !== "any" ? "strict" : options?.mode;
    let keyRegex;
    if (typeof (key) === "string") {
        const tester = getWordCharacterRegex({ iFlag, quantifier: "+", allowDashes: true, allowPeriods: true });
        if (tester.exec(key)?.[0] !== key) {
            throw new RangeError(`Invalid keyValueArg key`);
        }
        keyRegex = key;
    }
    else {
        keyRegex = getWordCharacterRegex({ iFlag, quantifier: "+", ...key });
    }
    const quotedRegex = getQuotedRegex({ iFlag, quantifier, style });
    const keyValueArgRegex = getRegexByMode({ capture, iFlag, keyRegex, mode, quotedRegex });
    const capturedRegex = capture
        ? captureRegex(keyValueArgRegex, capture)
        : keyValueArgRegex;
    const anchoredRegex = anchored
        ? anchorRegex(capturedRegex)
        : capturedRegex;
    const { expression, flags } = rewrite(anchoredRegex.source, { flags: gFlag + iFlag });
    return new RegExp(expression, flags);
}
export function getKeyValueArgRegex(options) {
    return getOrCreateRegex(createKeyValueArgRegex, options);
}
