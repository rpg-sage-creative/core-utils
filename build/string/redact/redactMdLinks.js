import { regex } from "regex";
const MarkdownLinkRegExpG = regex("gi") `
	\[
		(?<label> [^\]]+ )
	\]
	\(
		(?:
			<
				(?<escapedUrl> (s?ftp|https?)://[^\>]+ )
			>
			|
			(?<unEscapedUrl> (s?ftp|https?)://[^\)]+ )
		)
	\)
`;
export function redactMdLinks(content, charOrOpts) {
    if (!content)
        return content;
    const { char = "*", complete, labelChar = char, punctuationChar = char, urlChar = char } = typeof (charOrOpts) === "string"
        ? { char: charOrOpts }
        : charOrOpts ?? {};
    const [rLeftBracket, rRightBracket, rLeftParen, rRightParen, rLeftAngle, rRightAngle] = complete ? "".padEnd(6, punctuationChar) : "[]()<>";
    return content.replace(MarkdownLinkRegExpG, (_, label, escapedUrl, unescapedUrl) => {
        const rLabel = "".padEnd(label.length, labelChar);
        if (escapedUrl) {
            const rEscapedUrl = "".padEnd(escapedUrl.length, urlChar);
            return rLeftBracket + rLabel + rRightBracket + rLeftParen + rLeftAngle + rEscapedUrl + rRightAngle + rRightParen;
        }
        const rUnescapedUrl = "".padEnd(unescapedUrl.length, urlChar);
        return rLeftBracket + rLabel + rRightBracket + rLeftParen + rUnescapedUrl + rRightParen;
    });
}
