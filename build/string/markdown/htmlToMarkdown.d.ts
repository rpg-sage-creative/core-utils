type HtmlToMarkdownHandler = (innerHtml: string, attributes: Map<string, string>, nodeName: string, outerHtml: string) => string;
export declare function htmlToMarkdown(text: string, elementName: string, handler: HtmlToMarkdownHandler): string;
export {};
