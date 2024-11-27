import { regex } from "regex";
import { anchorRegex } from "../../regex/anchorRegex.js";
import { captureRegex } from "../../regex/captureRegex.js";
import { getOrCreateRegex } from "../../regex/internal/getOrCreateRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpCreateOptions } from "../../regex/RegExpOptions.js";
import { wrapRegex } from "../../regex/wrapRegex.js";

type Options = RegExpCreateOptions & RegExpAnchorOptions & RegExpCaptureOptions & {
	/** use ^ and $ to anchor the url to the start/end of the string */
	anchored?: boolean;

	/** expects the two characters used to wrap the url, ex: <> for discord */
	wrapChars?: string;

	/** determines if the .wrapped value is optional or not */
	wrapOptional?: boolean;
};

function createUrlRegex(options?: Options): RegExp {
	const { anchored, capture, gFlag = "", iFlag = "", wrapChars, wrapOptional } = options ?? {};
	const wrapRequired = wrapOptional ? "optional" : true;

	const urlRegex = regex(gFlag + iFlag)`
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
	// const { expression, flags } = rewrite(anchoredRegex.source, { flags:gFlag + iFlag });
	// return new RegExp(expression, flags);
}

/**
 * Returns an instance of the number regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 */
export function getUrlRegex(options?: Options): RegExp {
	return getOrCreateRegex(createUrlRegex, options);
}