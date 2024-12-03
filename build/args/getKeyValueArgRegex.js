import { pattern, regex, rewrite } from "regex";
import { getWordCharacterRegex } from "../characters/getWordCharacterRegex.js";
import { anchorRegex } from "../regex/anchorRegex.js";
import { captureRegex } from "../regex/captureRegex.js";
import { getOrCreateRegex } from "../regex/getOrCreateRegex.js";
import { getQuotedRegex } from "../string/index.js";
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
    const nakedRegex = pattern `[^\s\n\r${quotedRegex.leftChars}]\S*`;
    if (capture) {
        return regex(iFlag) `
			(?<=(^|\s))    # start of line or whitespace
			(?<${capture}Key>${keyRegex})
			=
			(
				(?<${capture}QuotedValue>${quotedRegex})
				|
				(?<${capture}NakedValue>${nakedRegex})  # unquoted value that doesn't start with left quote and has no spaces
			)
			(?=(\s|$))     # whitespace or end of line
		`;
    }
    return regex(iFlag) `
		(?<=(^|\s))        # start of line or whitespace
		${keyRegex}
		=
		(
			${quotedRegex}
			|
			${nakedRegex}  # unquoted value that doesn't start with left quote and has no spaces
		)
		(?=(\s|$))         # whitespace or end of line
	`;
}
function createSloppyRegex({ capture, iFlag, keyRegex, quotedRegex }) {
    const startBoundary = pattern `^|[\s${quotedRegex.rightChars}]`;
    const nakedRegex = pattern `[^\s\n\r${quotedRegex.leftChars}]\S*`;
    if (capture) {
        return regex(iFlag) `
			(?<=${startBoundary})                                # start of line or whitespace or a right quote
			(?<${capture}Key>${keyRegex})
			(
				\s*=\s*(?<${capture}QuotedValue>${quotedRegex})  # allow spaces around = only if the value is quoted; also captures the only quoted ("strict") values
				|
				=(?<${capture}NakedValue>${nakedRegex})          # allow an unquoted no-space value as long as it doesn't start with a left quote
				(?=(\s|$))                                       # whitespace or end of line
			)
		`;
    }
    return regex(iFlag) `
		(?<=${startBoundary})                # start of line or whitespace or a right quote
		${keyRegex}
		(
			\s*=\s*${quotedRegex}  # allow spaces around = only if the value is quoted; also captures the only quoted ("strict") values
			|
			=${nakedRegex}         # allow an unquoted no-space value as long as it doesn't start with a left quote
			(?=(\s|$))             # whitespace or end of line
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
    const { allowDashes, allowPeriods, anchored, capture, gFlag = "", iFlag = "i", key, quantifier = "*", style = "any" } = options ?? {};
    const mode = style !== "any" ? "strict" : options?.mode;
    let keyRegex;
    if (key) {
        const tester = getWordCharacterRegex({ iFlag, quantifier: "+", allowDashes: true, allowPeriods: true });
        if (tester.exec(key)?.[0] !== key) {
            throw new RangeError(`Invalid keyValueArg key`);
        }
        keyRegex = key;
    }
    else {
        keyRegex = getWordCharacterRegex({ iFlag, quantifier: "+", allowDashes, allowPeriods });
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
