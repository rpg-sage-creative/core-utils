import { getIdMatcher, SnowflakeMatcher, UuidMatcher } from "../../build/index.js";

describe("class", () => {
	describe("getIdMatcher", () => {

		const snowflake = "1234567890123456";
		const uuid = "1b6ace60-64cf-4a52-ab74-db0349655157";
		const bob = "bob";

		test(`snowflake should return a SnowflakeMatcher and match itself and not uuid nor bob.`, () => {
			const snowflakeMatcher = getIdMatcher(snowflake);
			expect(snowflakeMatcher.constructor).toBe(SnowflakeMatcher);
			expect(snowflakeMatcher.constructor).not.toBe(UuidMatcher);
			expect(snowflakeMatcher.matches(snowflake)).toBe(true);
			expect(snowflakeMatcher.matches(uuid)).toBe(false);
			expect(snowflakeMatcher.matches(bob)).toBe(false);
		});

		test(`uuid should return a UuidMatcher and match itself and not snowflake nor bob.`, () => {
			const uuidMatcher = getIdMatcher(uuid);
			expect(uuidMatcher.constructor).not.toBe(SnowflakeMatcher);
			expect(uuidMatcher.constructor).toBe(UuidMatcher);
			expect(uuidMatcher.matches(snowflake)).toBe(false);
			expect(uuidMatcher.matches(uuid)).toBe(true);
			expect(uuidMatcher.matches(bob)).toBe(false);
		});

		test(`bob should return an empty Matcher and not match anything.`, () => {
			const bobMatcher = getIdMatcher(bob);
			expect(bobMatcher.constructor).not.toBe(SnowflakeMatcher);
			expect(bobMatcher.constructor).not.toBe(UuidMatcher);
			expect(bobMatcher.matches(snowflake)).toBe(false);
			expect(bobMatcher.matches(uuid)).toBe(false);
			expect(bobMatcher.matches(bob)).toBe(false);
		});

	});
});
