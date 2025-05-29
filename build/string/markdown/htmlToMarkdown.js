import { regex } from "regex";
import { parseKeyValueArgs } from "../../args/parseKeyValueArgs.js";
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
    const regexp = regex("gi") `<(?<nodeName>${element})(?<attributes>\s[^>]+)?>(?<inner>(.|\n)*?)</(?:${element})>`;
    return text.replace(regexp, (outer, nodeName, attributes, inner) => {
        const attributeMap = parseKeyValueArgs(attributes).reduce((map, arg) => {
            map.set(arg.key, arg.value ?? "");
            return map;
        }, new Map());
        return handler(inner, attributeMap, nodeName, outer);
    });
}
