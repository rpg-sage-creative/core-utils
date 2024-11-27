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
        .formatHeaders()
        .formatHorizontalTab()
        .formatItalics()
        .formatLinks()
        .formatOrderedList()
        .formatParagraph()
        .formatStrikethrough()
        .formatUnderline()
        .formatUnorderedList()
        .formatBlockQuote()
        .toString();
}
