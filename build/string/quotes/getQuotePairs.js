export function getQuotePairs(style) {
    const pairs = [
        { chars: `""`, isSingle: false, isDouble: true, isFancy: false, isExtended: false, isArrow: false },
        { chars: `“”`, isSingle: false, isDouble: true, isFancy: true, isExtended: false, isArrow: false },
        { chars: `„“`, isSingle: false, isDouble: true, isFancy: false, isExtended: true, isArrow: false },
        { chars: `„”`, isSingle: false, isDouble: true, isFancy: false, isExtended: true, isArrow: false },
        { chars: `«»`, isSingle: false, isDouble: true, isFancy: false, isExtended: true, isArrow: true },
        { chars: `»«`, isSingle: false, isDouble: true, isFancy: false, isExtended: true, isArrow: true },
        { chars: `''`, isSingle: true, isDouble: false, isFancy: false, isExtended: false, isArrow: false },
        { chars: `‘’`, isSingle: true, isDouble: false, isFancy: true, isExtended: false, isArrow: false },
    ];
    if (style && style !== "any") {
        return pairs.filter(pair => {
            if (pair.isSingle && style.includes("double")) {
                return false;
            }
            if (pair.isDouble && style.includes("single")) {
                return false;
            }
            if ((pair.isFancy || pair.isExtended || pair.isArrow) && style.includes("strict")) {
                return false;
            }
            if ((pair.isExtended || pair.isArrow) && style.includes("fancy")) {
                return false;
            }
            if (pair.isArrow && style.includes("extended")) {
                return false;
            }
            return true;
        });
    }
    return pairs;
}
