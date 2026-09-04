import { parseKeyValueArgs } from "../../args/parseKeyValueArgs.js";
import { getSimpleHtmlElementRegex } from "../html/getSimpleHtmlElementRegex.js";
const RegExpMap = {};
export function htmlToMarkdown(text, element, handlerOrOpenMarkdown) {
    // if we don't have text to convert, just return what we got
    if (!text) {
        return text;
    }
    // create the output handler from the args
    let handler;
    if (typeof handlerOrOpenMarkdown === "function") {
        // use the function given
        handler = handlerOrOpenMarkdown;
    }
    else {
        // create a function using the given markdown
        const openMarkdown = handlerOrOpenMarkdown;
        const closeMarkdown = Array.from(openMarkdown).reverse().join("");
        handler = (inner) => openMarkdown + inner + closeMarkdown;
    }
    // create the html element regex
    const regexp = RegExpMap[element] ??= getSimpleHtmlElementRegex({ element, gFlag: "g", iFlag: "i" });
    // search/replace all
    return text.replace(regexp, (...values) => {
        const groups = values[values.length - 1];
        if (groups.comment)
            return "";
        // create attribute map
        const attributeMap = new Map();
        const attributes = groups.fullTagAttributes ?? groups.selfCloseAttributes;
        if (attributes) {
            parseKeyValueArgs(attributes).forEach(arg => {
                attributeMap.set(arg.key, arg.value ?? "");
            });
        }
        const elementName = groups.fullTagName ?? groups.selfCloseName;
        const elementNameLower = elementName?.toLowerCase();
        if (!elementNameLower)
            return "";
        // handle output
        return handler(groups.inner ?? "", attributeMap, elementNameLower, values[0]);
    });
}
