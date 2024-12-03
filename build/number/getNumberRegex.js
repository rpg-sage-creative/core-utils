import { regex, rewrite } from "regex";
import { anchorRegex } from "../regex/anchorRegex.js";
import { captureRegex } from "../regex/captureRegex.js";
import { getOrCreateRegex } from "../regex/getOrCreateRegex.js";
import { spoilerRegex } from "../regex/spoilerRegex.js";
function createNumberRegex(options) {
    const { anchored, capture, gFlag = "", iFlag = "", spoilers } = options ?? {};
    const numberRegex = regex(iFlag) `
		[\-+]?    # optional pos/neg sign
		\d+       # integer portion
		(\.\d+)?  # optional decimal portion
	`;
    const spoileredRegex = spoilers
        ? spoilerRegex(numberRegex, spoilers)
        : numberRegex;
    const capturedRegex = capture
        ? captureRegex(spoileredRegex, capture)
        : spoileredRegex;
    const anchoredRegex = anchored
        ? anchorRegex(capturedRegex)
        : capturedRegex;
    const { expression, flags } = rewrite(anchoredRegex.source, { flags: gFlag + iFlag });
    return new RegExp(expression, flags);
}
export function getNumberRegex(options) {
    return getOrCreateRegex(createNumberRegex, options);
}
