import { regex } from "regex";
import { anchorRegex } from "../regex/anchorRegex.js";
import { captureRegex } from "../regex/captureRegex.js";
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
    return regex(gFlag + iFlag) `${anchoredRegex}`;
}
const cache = {};
export function getNumberRegex(options) {
    if (options?.gFlag)
        return createNumberRegex(options);
    const key = [options?.anchored ?? "", options?.capture ?? "", options?.iFlag ?? "", options?.spoilers ?? ""].join("|");
    return cache[key] ?? (cache[key] = createNumberRegex(options));
}
