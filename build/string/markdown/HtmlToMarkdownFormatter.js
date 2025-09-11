import { HORIZONTAL_TAB } from "../consts.js";
import { htmlToMarkdown } from "./htmlToMarkdown.js";
function handleListItem(level, dashOrNumber, content) {
    const indent = "".padEnd(level * 2, " ");
    const dot = dashOrNumber === "-" ? "" : ".";
    return `\n${indent}${dashOrNumber}${dot} ${content}`;
}
function handleOrdered(content, level) {
    return htmlToMarkdown(content, "ol", (olInnerHtml, atts) => {
        let indexer = 0;
        const start = isNaN(+atts.get("start")) ? 1 : +atts.get("start");
        return htmlToMarkdown(olInnerHtml, "ul|li", (childInnerHtml, _, childNodeName, childOuterHtml) => {
            switch (childNodeName) {
                case "ol": return handleOrdered(childOuterHtml, level + 1);
                case "ul": return handleUnordered(childOuterHtml, level + 1);
                default: return handleListItem(level, start + indexer++, childInnerHtml);
            }
        });
    });
}
function handleUnordered(content, level) {
    return htmlToMarkdown(content, "ul", ulInnerHtml => {
        return htmlToMarkdown(ulInnerHtml, "ol|li", (childInnerHtml, _, childNodeName, childOuterHtml) => {
            switch (childNodeName) {
                case "ol": return handleOrdered(childOuterHtml, level + 1);
                case "ul": return handleUnordered(childOuterHtml, level + 1);
                default: return handleListItem(level, "-", childInnerHtml);
            }
        });
    });
}
export class HtmlToMarkdownFormatter {
    text;
    constructor(text) {
        this.text = text;
    }
    formatBlockQuote() {
        const newLine = "\n";
        this.text = htmlToMarkdown(this.text, "blockquote", innerHtml => newLine + innerHtml.split(newLine).map(s => `> ${s}`).join(newLine) + newLine);
        return this;
    }
    formatBold() {
        this.text = htmlToMarkdown(this.text, "b|strong", "**");
        return this;
    }
    formatCode() {
        this.text = htmlToMarkdown(this.text, "code", "`");
        return this;
    }
    formatHeaders() {
        this.text = htmlToMarkdown(this.text, "h1", innerHtml => `\n# ${innerHtml}`);
        this.text = htmlToMarkdown(this.text, "h2", innerHtml => `\n## ${innerHtml}`);
        this.text = htmlToMarkdown(this.text, "h3", innerHtml => `\n### ${innerHtml}`);
        this.text = htmlToMarkdown(this.text, "h4|h5|h6", "\n__**");
        return this;
    }
    formatHorizontalTab() {
        if (this.text) {
            this.text = this.text.replace(/\t([^>]|$)/g, `${HORIZONTAL_TAB}$1`);
        }
        return this;
    }
    formatItalics() {
        this.text = htmlToMarkdown(this.text, "i|em", "*");
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
    formatLists() {
        this.text = htmlToMarkdown(this.text, "ol|ul", (_innerHtml, _atts, nodeName, outerHtml) => {
            console.log({ _innerHtml, _atts, nodeName, outerHtml });
            if (nodeName === "ol") {
                return handleOrdered(outerHtml, 0);
            }
            return handleUnordered(outerHtml, 0);
        });
        return this;
    }
    formatNewLine() {
        if (this.text) {
            this.text = this.text.replace(/<br\/?>/gi, "\n");
        }
        return this;
    }
    formatParagraph() {
        return this;
    }
    formatFooter() {
        this.text = htmlToMarkdown(this.text, "footer", innerHtml => `-# ${innerHtml}`);
        return this;
    }
    formatStrikethrough() {
        this.text = htmlToMarkdown(this.text, "del|s|strike", "~~");
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
    toString() {
        return this.text;
    }
}
