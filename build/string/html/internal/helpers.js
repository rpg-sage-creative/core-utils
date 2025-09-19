export function createTagNameSource(options) {
    const { tagName = "tagName" } = options?.captureGroups ?? {};
    const { pattern = "[a-zA-Z0-9]+" } = options ?? {};
    return `(?<${tagName}>${pattern})`;
}
export function createAttributesSource(options) {
    const { attributes = "attributes", quotes = "quotes" } = options?.captureGroups ?? {};
    return `(?<${attributes}>(\\s+[a-zA-Z\\-]+(=(?<${quotes}>["']).*?\\k<${quotes}>)?)+)?`;
}
const SelfClosePattern = "br|hr|img|input|link|meta";
export function createSelfCloseSource(options) {
    return `(<${createTagNameSource({ pattern: SelfClosePattern, ...options })}${createAttributesSource(options)}\\s*/?>)`;
}
export function createOpenTagSource(options) {
    return `(<${createTagNameSource(options)}${createAttributesSource(options)}\\s*>)`;
}
export function createCloseTagSource(options) {
    return `(</${createTagNameSource(options)}\\s*>)`;
}
export function createFullTagSource(options) {
    const { tagName = "tagName", inner = "inner" } = options?.captureGroups ?? {};
    return `(<${createTagNameSource(options)}${createAttributesSource(options)}\\s*>(?<${inner}>(.|\\n)*?)</\\k<${tagName}>>)`;
}
export function isSelfCloseElement(element) {
    return SelfClosePattern.split("|").includes(element.toLowerCase());
}
