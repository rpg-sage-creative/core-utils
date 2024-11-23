import { regex } from "regex";
import { anchorRegex } from "./anchorRegex.js";
import { captureRegex } from "./captureRegex.js";
import { getOrCreateRegex } from "./internal/getOrCreateRegex.js";
import { spoilerRegex } from "./spoilerRegex.js";
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
    return regex(gFlag + iFlag) `${anchoredRegex}`;
}
export function getNumberRegex(options) {
    return getOrCreateRegex(createNumberRegex, options);
}
