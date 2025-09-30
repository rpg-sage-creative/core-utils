import { redactCodeBlocks } from "./redactCodeBlocks.js";
import { redactKeyValuePairs } from "./redactKeyValuePairs.js";
import { redactMdLinks } from "./redactMdLinks.js";
export function redactContent(content, options) {
    const { codeBlocks, keyValuePairs, mdLinks, redactedCharacter } = options ?? {};
    if (codeBlocks !== false) {
        content = redactCodeBlocks(content, redactedCharacter);
    }
    if (keyValuePairs !== false) {
        content = redactKeyValuePairs(content, redactedCharacter);
    }
    if (mdLinks !== false) {
        content = redactMdLinks(content, redactedCharacter);
    }
    return content;
}
