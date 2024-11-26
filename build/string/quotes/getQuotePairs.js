const SINGLE = "\u0027";
const SINGLE_LEFT = "\u2018";
const SINGLE_RIGHT = "\u2019";
const SINGLE_UNIVERSAL = SINGLE + SINGLE;
const SINGLE_ENGLISH = SINGLE_LEFT + SINGLE_RIGHT;
const DOUBLE = "\u0022";
const DOUBLE_LEFT = "\u201C";
const DOUBLE_RIGHT = "\u201D";
const DOUBLE_LEFT_LOW = "\u201E";
const DOUBLE_ARROW_LEFT = "\u00AB";
const DOUBLE_ARROW_RIGHT = "\u00BB";
const DOUBLE_UNIVERSAL = DOUBLE + DOUBLE;
const DOUBLE_ENGLISH = DOUBLE_LEFT + DOUBLE_RIGHT;
const DOUBLE_GERMAN = DOUBLE_LEFT_LOW + DOUBLE_LEFT;
const DOUBLE_POLISH = DOUBLE_LEFT_LOW + DOUBLE_RIGHT;
const DOUBLE_FRENCH = DOUBLE_ARROW_LEFT + DOUBLE_ARROW_RIGHT;
const DOUBLE_SWEDISH = DOUBLE_ARROW_RIGHT + DOUBLE_ARROW_LEFT;
export function getQuotePairs(style) {
    const pairs = [
        { chars: DOUBLE_UNIVERSAL, isSingle: false, isDouble: true, isFancy: false, isExtended: false, isArrow: false },
        { chars: DOUBLE_ENGLISH, isSingle: false, isDouble: true, isFancy: true, isExtended: false, isArrow: false },
        { chars: DOUBLE_GERMAN, isSingle: false, isDouble: true, isFancy: false, isExtended: true, isArrow: false },
        { chars: DOUBLE_POLISH, isSingle: false, isDouble: true, isFancy: false, isExtended: true, isArrow: false },
        { chars: DOUBLE_FRENCH, isSingle: false, isDouble: true, isFancy: false, isExtended: true, isArrow: true },
        { chars: DOUBLE_SWEDISH, isSingle: false, isDouble: true, isFancy: false, isExtended: true, isArrow: true },
        { chars: SINGLE_UNIVERSAL, isSingle: true, isDouble: false, isFancy: false, isExtended: false, isArrow: false },
        { chars: SINGLE_ENGLISH, isSingle: true, isDouble: false, isFancy: true, isExtended: false, isArrow: false },
    ];
    if (style && style !== "any") {
        return pairs.filter(pair => {
            if (pair.isSingle && style.includes("double"))
                return false;
            if (pair.isDouble && style.includes("single"))
                return false;
            if ((pair.isFancy || pair.isExtended || pair.isArrow) && style.includes("strict"))
                return false;
            if ((pair.isExtended || pair.isArrow) && style.includes("fancy"))
                return false;
            if (pair.isArrow && style.includes("extended"))
                return false;
            return true;
        });
    }
    return pairs;
}
