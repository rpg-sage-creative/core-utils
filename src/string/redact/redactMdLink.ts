import { regex } from "regex";
import type { Optional } from "../../types/generics.js";

let regexp: RegExp;

export function redactMdLink(content: string, redactedCharacter?: string): string;
export function redactMdLink(content: Optional<string>, redactedCharacter?: string): Optional<string>;
export function redactMdLink(content: Optional<string>, redactedCharacter = "*"): Optional<string> {
	if (!content) return content;

	// let's redact links
	regexp ??= regex("gi")`
		\[
			(?<label> [^\]]+ )
		\]
		\(
			(?:

				<
					(?<escapedUrl> (s?ftp|https?)://[^\)]+ )
				>
				|
				(?<unEscapedUrl> (s?ftp|https?)://[^\)]+ )
			)
		\)
	`;

	return content.replace(regexp, (_, label, escapedUrl, unescapedUrl) => {
		const rLabel = "".padEnd(label.length, redactedCharacter);
		if (escapedUrl) {
			const rEscapedUrl = "".padEnd(escapedUrl.length, redactedCharacter);
			return `[${rLabel}](<${rEscapedUrl}>)`;
		}
		const rUnescapedUrl = "".padEnd(unescapedUrl.length, redactedCharacter);
		return `[${rLabel}](${rUnescapedUrl})`;
	});
}