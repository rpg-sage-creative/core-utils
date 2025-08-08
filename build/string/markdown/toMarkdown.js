import { HtmlToMarkdownFormatter } from "./HtmlToMarkdownFormatter.js";
export function toMarkdown(html) {
    if (!html) {
        return html;
    }
    return new HtmlToMarkdownFormatter(html)
        .formatNewLine()
        .formatTable()
        .formatBold()
        .formatCode()
        .formatFooter()
        .formatHeaders()
        .formatHorizontalTab()
        .formatItalics()
        .formatLinks()
        .formatLists()
        .formatParagraph()
        .formatStrikethrough()
        .formatUnderline()
        .formatBlockQuote()
        .toString();
}
