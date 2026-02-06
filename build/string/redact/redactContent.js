import { redactCodeBlocks } from "./redactCodeBlocks.js";
import { redactKeyValuePairs } from "./redactKeyValuePairs.js";
import { redactMdLinks } from "./redactMdLinks.js";
export function redactContent(content, charOrOpts) {
    if (!content)
        return content;
    const { codeBlocks, keyValuePairs, mdLinks, ...defaults } = typeof (charOrOpts) === "string"
        ? { char: charOrOpts }
        : charOrOpts ?? {};
    if (codeBlocks !== false) {
        const opts = codeBlocks === true ? defaults : { ...defaults, ...codeBlocks };
        content = redactCodeBlocks(content, opts);
    }
    if (keyValuePairs !== false) {
        const opts = keyValuePairs === true ? defaults : { ...defaults, ...keyValuePairs };
        content = redactKeyValuePairs(content, opts);
    }
    if (mdLinks !== false) {
        const opts = mdLinks === true ? defaults : { ...defaults, ...mdLinks };
        content = redactMdLinks(content, opts);
    }
    return content;
}
