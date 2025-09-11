type Options = {
    element?: string;
    gFlag?: "g" | "";
    iFlag?: "i" | "";
};
type SimpleHtmlCommentGroup = {
    comment: string;
    selfCloseName?: never;
    selfCloseAttributes?: never;
    fullTagName?: never;
    fullTagAattributes?: never;
    inner?: never;
};
type SimpleHtmlNoCloseGroup = {
    comment?: never;
    selfCloseName: string;
    selfCloseAttributes?: string;
    fullTagName?: never;
    fullTagAattributes?: never;
    inner?: never;
};
type SimpleHtmlCloseableGroup = {
    comment?: never;
    selfCloseName?: never;
    selfCloseAttributes?: never;
    fullTagName: string;
    fullTagAattributes?: string;
    inner?: string;
};
export type SimpleHtmlRegExpExecGroup = SimpleHtmlCommentGroup | SimpleHtmlNoCloseGroup | SimpleHtmlCloseableGroup;
export type SimpleHtmlRegExpExecArray = RegExpExecArray & {
    groups?: SimpleHtmlCloseableGroup;
};
/** groups: { comment, noCloseTag, noCloseTagAttributes, closeableTag, closeableTagAattributes, inner } */
export declare function getSimpleHtmlElementRegex({ element, gFlag, iFlag }?: Options): RegExp;
export {};
