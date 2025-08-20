import { regex } from "regex";
import type { Optional } from "../../types/generics.js";

let regexp: RegExp;

export function redactMdLink(content: string): string;
export function redactMdLink(content: Optional<string>): Optional<string>;
export function redactMdLink(content: Optional<string>): Optional<string> {
	if (!content) return content;

	// let's redact links
	regexp ??= regex("gi")`
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