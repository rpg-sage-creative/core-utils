import { regex } from "regex";
import { anchorRegex } from "../../regex/anchorRegex.js";
import { captureRegex } from "../../regex/captureRegex.js";
import { getOrCreateRegex } from "../../regex/internal/getOrCreateRegex.js";
import { wrapRegex } from "../../regex/wrapRegex.js";
function createUrlRegex(options) {
    const { anchored, capture, gFlag = "", iFlag = "", wrapChars, wrapOptional } = options ?? {};
    const wrapRequired = wrapOptional ? "optional" : true;
    const urlRegex = regex(gFlag + iFlag) `
		# protocol
		(s?ftp|https?)://

		# auth
		(\S+(:\S*)?@)?

		# hostname
		(
			# first sub can have - or underscore, but cannot end in one
			(([0-9a-z\u00a1-\uffff][\-_]*)*[0-9a-z\u00a1-\uffff]+\.)

			# domain can have dashes, but cannot end in one
			(([0-9a-z\u00a1-\uffff]-*)*[0-9a-z\u00a1-\uffff]+\.)*

			# alpha only tld
			([a-z\u00a1-\uffff]{2,})

			|
			# ipv4
			(\d{1,3}\.){3}\d{1,3}

			|
			localhost
		)

		# port
		(:\d{2,5})?

		# path
		(/[%.~+\-\w]*)*

		# querystring
		(\?[;&=%.~+\-\w]*)?

		# anchor
		(\#[\-\w]*)?
	`;
    const wrappedRegex = wrapChars
        ? wrapRegex(urlRegex, wrapChars, wrapRequired)
        : urlRegex;
    const capturedRegex = capture
        ? captureRegex(wrappedRegex, capture)
        : wrappedRegex;
    const anchoredRegex = anchored
        ? anchorRegex(capturedRegex)
        : capturedRegex;
    return anchoredRegex;
}
export function getUrlRegex(options) {
    return getOrCreateRegex(createUrlRegex, options);
}