/** @internal used to match element names, default: [a-zA-Z0-9]+ */
export function createTagNameSource(options) {
    const { tagName = "tagName" } = options?.captureGroups ?? {};
    const { pattern = "[a-zA-Z0-9]+" } = options ?? {};
    return `(?<${tagName}>${pattern})`;
}
/** @internal used to match one or more: att="value" */
export function createAttributesSource(options) {
    const { attributes = "attributes", quotes = "quotes" } = options?.captureGroups ?? {};
    return `(?<${attributes}>(\\s+[a-zA-Z\\-]+(=(?<${quotes}>["']).*?\\k<${quotes}>)?)+)?`;
}
//#endregion
//#region SelfClose
const SelfClosePattern = "br|hr|img|input|link|meta";
/** @internal used to match one self closing element (/ optional) with zero or more attributes: <elementName/> */
export function createSelfCloseSource(options) {
    return `(<${createTagNameSource({ pattern: SelfClosePattern, ...options })}${createAttributesSource(options)}\\s*/?>)`;
}
/** @internal */
export function createOpenTagSource(options) {
    return `(<${createTagNameSource(options)}${createAttributesSource(options)}\\s*>)`;
}
/** @internal Used to match one: </elementName> */
export function createCloseTagSource(options) {
    return `(</${createTagNameSource(options)}\\s*>)`;
}
/** @internal Used to match one full element with optional attributes and inner: <elementName attributes>inner</elementName> */
export function createFullTagSource(options) {
    const { tagName = "tagName", inner = "inner" } = options?.captureGroups ?? {};
    return `(<${createTagNameSource(options)}${createAttributesSource(options)}\\s*>(?<${inner}>(.|\\n)*?)</\\k<${tagName}>>)`;
}
export function isSelfCloseElement(element) {
    return SelfClosePattern.split("|").includes(element.toLowerCase());
}
