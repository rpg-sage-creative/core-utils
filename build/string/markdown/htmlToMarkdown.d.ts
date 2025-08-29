import { type InterpolatedValue } from "regex";
type HtmlToMarkdownHandler = (innerHtml: string, attributes: Map<string, string>, nodeName: Lowercase<string>, outerHtml: string) => string;
export declare function htmlToMarkdown(text: string, element: InterpolatedValue, handler: HtmlToMarkdownHandler): string;
export {};
