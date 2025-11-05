import { debug } from "../../console/index.js";
import { tagLiterals } from "../../templates/tagLiterals.js";
import { createCloseTagSource, createSelfCloseSource } from "./internal/helpers.js";
export function createHtmlTagRegex(options) {
    debug(tagLiterals `createHtmlTagRegex(${options})`);
    const source = `(${createCloseTagSource(options)}|${createSelfCloseSource(options)})`;
    return new RegExp(source, options?.flags);
}
