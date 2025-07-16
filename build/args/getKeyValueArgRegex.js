import { pattern, regex } from "regex";
import { getWordCharacterRegex } from "../characters/getWordCharacterRegex.js";
import { escapeRegex } from "../regex/escapeRegex.js";
import { getOrCreateRegex } from "../regex/getOrCreateRegex.js";
import { getQuotedRegex } from "../string/index.js";
function createStrictRegex({ flags, keyRegex, quotedRegex }) {
    return regex(flags) `
		(?<=(^|\s))     # start of line or whitespace
		${keyRegex}
		=
		${quotedRegex}
		(?=(\s|$))      # whitespace or end of line
	`;
}
function createDefaultRegex({ flags, keyRegex, quotedRegex }) {
    const nakedRegex = pattern `[^\s\n\r${quotedRegex.leftChars}]\S*`;
    return regex(flags) `
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
function createSloppyRegex({ flags, keyRegex, quotedRegex }) {
    const startBoundary = pattern `^|[\s${quotedRegex.rightChars}]`;
    const nakedRegex = pattern `[^\s\n\r${quotedRegex.leftChars}]\S*`;
    return regex(flags) `
		(?<=${startBoundary})      # start of line or whitespace or a right quote
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
    const { allowDashes, allowPeriods, gFlag = "", iFlag = "i", key, contents = "*", style = "any" } = options ?? {};
    const mode = style !== "any" ? "strict" : options?.mode;
    const flags = gFlag + iFlag;
    let keyRegex;
    if (key) {
        const tester = getWordCharacterRegex({ iFlag, quantifier: "+", allowDashes: true, allowPeriods: true });
        if (tester.exec(key)?.[0] !== key) {
            throw new RangeError(`Invalid keyValueArg key`);
        }
        keyRegex = new RegExp(escapeRegex(key), iFlag + "u");
    }
    else {
        keyRegex = getWordCharacterRegex({ iFlag, quantifier: "+", allowDashes, allowPeriods });
    }
    const quotedRegex = getQuotedRegex({ iFlag, contents, style });
    const keyValueArgRegex = getRegexByMode({ flags, keyRegex, mode, quotedRegex });
    return keyValueArgRegex;
}
export function getKeyValueArgRegex(options) {
    return getOrCreateRegex(createKeyValueArgRegex, options);
}
