import { createCloseTagSource, createSelfCloseSource } from "./internal/helpers.js";
export function createHtmlTagRegex(options) {
    const source = `(${createCloseTagSource(options)}|${createSelfCloseSource(options)})`;
    return new RegExp(source, options?.flags);
}
