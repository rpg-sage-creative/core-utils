import { parseKeyValueArgs } from "../../args/parseKeyValueArgs.js";
import { getSimpleHtmlElementRegex } from "../html/getSimpleHtmlElementRegex.js";
export function htmlToMarkdown(text, element, handlerOrOpenMarkdown) {
    if (!text) {
        return text;
    }
    let handler;
    if (typeof handlerOrOpenMarkdown === "function") {
        handler = handlerOrOpenMarkdown;
    }
    else {
        const openMarkdown = handlerOrOpenMarkdown;
        const closeMarkdown = Array.from(openMarkdown).reverse().join("");
        handler = (inner) => openMarkdown + inner + closeMarkdown;
    }
    const regexp = getSimpleHtmlElementRegex({ element, gFlag: "g", iFlag: "i" });
    return text.replace(regexp, (...values) => {
        const groups = values[values.length - 1];
        if (groups.comment)
            return "";
        const attributeMap = new Map();
        const attributes = groups.fullTagAattributes ?? groups.selfCloseAttributes;
        if (attributes) {
            parseKeyValueArgs(attributes).forEach(arg => {
                attributeMap.set(arg.key, arg.value ?? "");
            });
        }
        const elementName = groups.fullTagName ?? groups.selfCloseName;
        const elementNameLower = elementName?.toLowerCase();
        if (!elementNameLower)
            return "";
        return handler(groups.inner ?? "", attributeMap, elementNameLower, values[0]);
    });
}
