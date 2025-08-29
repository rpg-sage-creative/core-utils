import { type Pattern } from "regex";
type HtmlToMarkdownHandler = (innerHtml: string, attributes: Map<string, string>, nodeName: Lowercase<string>, outerHtml: string) => string;
export declare function htmlToMarkdown(text: string, element: string | Pattern, handler: HtmlToMarkdownHandler): string;
export {};
