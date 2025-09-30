import { regex } from "regex";
let regexp;
export function redactMdLinks(content, redactedCharacter = "*") {
    if (!content)
        return content;
    regexp ??= regex("gi") `
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
