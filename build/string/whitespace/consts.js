export const WhitespaceRegExp = /\s+/;
export const OptionalWhitespaceRegExp = /\s*/;
export const HorizontalWhitespaceRegExp = /[^\S\r\n]+/;
export const OptionalHorizontalWhitespaceRegExp = /[^\S\r\n]*/;
export const HorizontalWhitespaceRegExpG = new RegExp(HorizontalWhitespaceRegExp, "g");
