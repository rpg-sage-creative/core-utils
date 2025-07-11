import { pattern } from "regex";
import { HORIZONTAL_TAB } from "../consts.js";
import { htmlToMarkdown } from "./htmlToMarkdown.js";
export class HtmlToMarkdownFormatter {
    text;
    constructor(text) {
        this.text = text;
    }
    formatBlockQuote() {
        const newLine = `\n`;
        this.text = htmlToMarkdown(this.text, "blockquote", innerHtml => newLine + innerHtml.split(newLine).map(s => "> " + s).join(newLine) + newLine);
        return this;
    }
    formatBold() {
        this.text = htmlToMarkdown(this.text, pattern `b|strong`, "**");
        return this;
    }
    formatCode() {
        this.text = htmlToMarkdown(this.text, "code", "`");
        return this;
    }
    formatHeaders() {
        this.text = htmlToMarkdown(this.text, "h1", innerHtml => `\n# ` + innerHtml);
        this.text = htmlToMarkdown(this.text, "h2", innerHtml => `\n## ` + innerHtml);
        this.text = htmlToMarkdown(this.text, "h3", innerHtml => `\n### ` + innerHtml);
        this.text = htmlToMarkdown(this.text, pattern `h\d`, `\n__**`);
        return this;
    }
    formatHorizontalTab() {
        if (this.text) {
            this.text = this.text.replace(/\t([^>]|$)/g, HORIZONTAL_TAB + "$1");
        }
        return this;
    }
    formatItalics() {
        this.text = htmlToMarkdown(this.text, pattern `i|em`, "*");
        return this;
    }
    formatLinks() {
        this.text = htmlToMarkdown(this.text, "a", (text, attributes) => {
            if (!attributes?.has("href")) {
                return text;
            }
            const titleText = attributes.has("title") ? ` "${attributes.get("title")}"` : ``;
            return `[${text}](${attributes.get("href")}${titleText})`;
        });
        return this;
    }
    formatNewLine() {
        if (this.text) {
            this.text = this.text.replace(/<br\/?>/gi, "\n");
        }
        return this;
    }
    formatOrderedList() {
        this.text = htmlToMarkdown(this.text, "ol", (list, attributes) => {
            const start = isNaN(+attributes.get("start")) ? 1 : +attributes.get("start");
            let index = 0;
            return htmlToMarkdown(list, "li", value => `\n **${start + index++}.** ${value}`);
        });
        return this;
    }
    formatParagraph() {
        return this;
    }
    formatStrikethrough() {
        this.text = htmlToMarkdown(this.text, pattern `del|s|strike`, "~~");
        return this;
    }
    formatTable() {
        const stripRegex = /<[^>]+>/gi;
        this.text = htmlToMarkdown(this.text, "table", tableHtml => {
            const table = [];
            htmlToMarkdown(tableHtml, "tr", rowHtml => {
                const row = [];
                htmlToMarkdown(rowHtml, "th|td", cellHtml => {
                    row.push(cellHtml.replace(stripRegex, ""));
                    return "";
                });
                table.push(row);
                return "";
            });
            return table.map((row, rowIndex) => {
                const underline = rowIndex ? "" : "__";
                const cells = row.join(" | ");
                return `> ${underline}${cells}${underline}`;
            }).join("\n");
        });
        return this;
    }
    formatUnderline() {
        this.text = htmlToMarkdown(this.text, "u", "__");
        return this;
    }
    formatUnorderedList() {
        this.text = htmlToMarkdown(this.text, "ul", parentList => {
            const childHandled = htmlToMarkdown(parentList, "ul", nestedList => htmlToMarkdown(nestedList, "li", value => `\n - ${value}`));
            return htmlToMarkdown(childHandled, "li", value => `\n- ${value}`);
        });
        return this;
    }
    toString() {
        return this.text;
    }
}
