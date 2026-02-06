import { isSnowflake } from "../snowflake/isSnowflake.js";
import { SnowflakeMatcher } from "../snowflake/SnowflakeMatcher.js";
import { isUuid } from "../uuid/isUuid.js";
import { UuidMatcher } from "../uuid/UuidMatcher.js";
export function getIdMatcher(value) {
    if (value) {
        if (isSnowflake(value)) {
            return new SnowflakeMatcher(value);
        }
        if (isUuid(value)) {
            return new UuidMatcher(value);
        }
    }
    return {
        isNonNil: false,
        isValid: false,
        matchValue: "",
        value,
        matches: () => false,
        matchesAny: () => false,
        toString: () => value
    };
}
