import { regex } from "regex";
import { getOrCreateRegex } from "../../regex/getOrCreateRegex.js";
import { wrapRegex } from "../../regex/wrapRegex.js";
function createUrlRegex(options) {
    const { anchored, capture, gFlag = "", iFlag = "", wrapChars, wrapOptional } = options ?? {};
    const wrapRequired = wrapOptional ? "optional" : true;
    const flags = gFlag + iFlag;
    const urlRegex = regex(flags) `
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
        ? new RegExp(`(?<${capture}>${wrappedRegex.source})`, flags)
        : wrappedRegex;
    const anchoredRegex = anchored
        ? new RegExp(`^(?:${capturedRegex.source})$`, flags)
        : capturedRegex;
    return anchoredRegex;
}
export function getUrlRegex(options) {
    return getOrCreateRegex(createUrlRegex, options);
}
