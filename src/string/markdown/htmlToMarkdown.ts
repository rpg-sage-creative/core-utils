import { regex, type InterpolatedValue } from "regex";
import { parseKeyValueArgs } from "../../args/parseKeyValueArgs.js";

/*
	regex doesn't natively export type Pattern
	I had to go in and edit ./modules/core-utils/node_modules/regex/dist/esm/regex.d.ts
	The last line was `export { pattern };`
	I changed it to `export { pattern, type Pattern };`
	I may need to alter my build script that manages pdf2json type definitions to also do this
*/

type HtmlToMarkdownHandler = (innerHtml: string, attributes: Map<string, string>, nodeName: Lowercase<string>, outerHtml: string) => string;

/** @internal Handles nested html tags */
export function htmlToMarkdown(text: string, element: InterpolatedValue, openMarkdown: string): string;
export function htmlToMarkdown(text: string, element: InterpolatedValue, handler: HtmlToMarkdownHandler): string;
export function htmlToMarkdown(text: string, element: InterpolatedValue, handlerOrOpenMarkdown: string | HtmlToMarkdownHandler): string {
	// if we don't have text to convert, just return what we got
	if (!text) {
		return text;
	}

	// create the output handler from the args
	let handler: HtmlToMarkdownHandler;

	if (typeof handlerOrOpenMarkdown === "function") {
		// use the function given
		handler = handlerOrOpenMarkdown;

	}else {
		// create a function using the given markdown
		const openMarkdown = handlerOrOpenMarkdown;
		const closeMarkdown = Array.from(openMarkdown).reverse().join("");
		handler = (inner: string) => openMarkdown + inner + closeMarkdown;
	}

	// create the html element regex
	const regexp = regex("gi")`<(?<nodeName>${element})(?<attributes>\s[^>]+)?>(?<inner>(.|\n)*?)</\k<nodeName>>`;

	// search/replace all
	return text.replace(regexp, (outer: string, nodeName: string, attributes: string, inner: string) => {
		// create attribute map
		const attributeMap = parseKeyValueArgs(attributes).reduce((map, arg) => {
			map.set(arg.key, arg.value ?? "");
			return map;
		}, new Map<string, string>());

		// handle output
		return handler(inner, attributeMap, nodeName.toLowerCase(), outer);
	});
}