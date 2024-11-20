import { HasIdCore } from "../../build/index.js";
import { toString } from "../toString.mjs";

class HasIdCoreTester extends HasIdCore { }

describe("class", () => {
	describe("HasIdCore", () => {
		const snowflake = "1234567890123456";
		const uuid = "1b6ace60-64cf-4a52-ab74-db0349655157";

		const hasSnowflakeCore = new HasIdCoreTester({ id:snowflake, objectType:"SnowflakeTester" });
		const hasUuidCore = new HasIdCoreTester({ id:uuid, objectType:"UuidTester" });
		const hasMultiCore = new HasIdCoreTester({ id:"control", did:snowflake, uuid:uuid, objectType:"MultiTester" });

		/** [ [input, equalsSnowflakeCore, equalsUuidCore, equalsMultiCore] ... ] */
		const tests = [
			[hasSnowflakeCore, true, false, true],
			[snowflake, true, false, true],
			[hasUuidCore, false, true, true],
			[uuid, false, true, true],
			["control", false, false, false]
		];

		describe("HasIdCore<snowflake>.equals", () => {
			tests.forEach(([input, equalsSnowflakeCore]) => {
				test(`hasSnowflakeCore.equals(${toString(input)}) === ${equalsSnowflakeCore}`, () => expect(hasSnowflakeCore.equals(input)).toBe(equalsSnowflakeCore));
			});
		});

		describe("HasIdCore<uuid>.equals", () => {
			tests.forEach(([input, equalsSnowflakeCore, equalsUuidCore]) => {
				test(`hasUuidCore.equals(${toString(input)}) === ${equalsUuidCore}`, () => expect(hasUuidCore.equals(input)).toBe(equalsUuidCore));
			});
		});

		describe("HasIdCore<multi>.equals", () => {
			tests.forEach(([input, equalsSnowflakeCore, equalsUuidCore, equalsMultiCore]) => {
				test(`hasMultiCore.equals(${toString(input)}) === ${equalsMultiCore}`, () => expect(hasMultiCore.equals(input)).toBe(equalsMultiCore));
			});
		});
	});
});
