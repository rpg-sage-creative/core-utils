import { createFullTagSource, createSelfCloseSource, isSelfCloseElement } from "./internal/helpers.js";
;
export function getSimpleHtmlElementRegex({ element, gFlag = "", iFlag = "i" } = {}) {
    const flags = gFlag + iFlag;
    const elements = element?.toLowerCase().split("|");
    if (elements?.length) {
        const selfClosePattern = elements.filter(el => el.trim() && isSelfCloseElement(el)).join("|") || undefined;
        const selfCloseSource = createSelfCloseSource({ captureGroups: { tagName: "selfCloseTagName", attributes: "selfCloseAttributes", quotes: "selfCloseQuotes" }, pattern: selfClosePattern, flags });
        const fullClosePattern = elements.filter(el => el.trim() && !isSelfCloseElement(el)).join("|") || undefined;
        const fullTagSource = createFullTagSource({ captureGroups: { tagName: "fullTagName", attributes: "fullTagAttributes", quotes: "fullTagQuotes" }, pattern: fullClosePattern, flags });
        if (selfClosePattern && fullClosePattern) {
            return new RegExp(`(${selfCloseSource}|${fullTagSource})`, flags);
        }
        else if (selfClosePattern) {
            return new RegExp(selfCloseSource, flags);
        }
        else if (fullClosePattern) {
            return new RegExp(fullTagSource, flags);
        }
    }
    const commentSource = `(?<comment><!--.*?-->)`;
    const selfCloseSource = createSelfCloseSource({ captureGroups: { tagName: "selfCloseTagName", attributes: "selfCloseAttributes", quotes: "selfCloseQuotes" }, flags });
    const fullTagSource = createFullTagSource({ captureGroups: { tagName: "fullTagName", attributes: "fullTagAttributes", quotes: "fullTagQuotes" }, flags });
    return new RegExp(`(${commentSource}|${selfCloseSource}|${fullTagSource})`, flags);
}
