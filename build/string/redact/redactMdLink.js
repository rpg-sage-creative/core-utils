import { regex } from "regex";
let regexp;
export function redactMdLink(content) {
    if (!content)
        return content;
    regexp ??= regex("gi") `
		\[
			[^\]]+
		\]
		\(
			(
			<(s?ftp|https?)://[^\)]+>
			|
			(s?ftp|https?)://[^\)]+
			)
		\)
	`;
    return content.replace(regexp, link => "".padEnd(link.length, "*"));
}
