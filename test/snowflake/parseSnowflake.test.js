import { parseSnowflake, randomSnowflake } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("snowflake", () => {
	describe("parseSnowflake", () => {

		const short = "123456789012345";
		const min = "1234567890123456";
		const id = randomSnowflake();
		const channelId = `<#${id}>`;
		const roleId = `<@&${id}>`;
		const userId = `<@${id}>`;
		const control = "control";

		/** [ [input, output], ... ] */
		const tests = [
			[short, undefined],
			[min, min],
			[id, id],
			[channelId, id],
			[roleId, id],
			[userId, id],
			[control, undefined],
		];

		tests.forEach(([input, output]) => {
			test(`parseSnowflake(${toString(input)}) === ${toString(output)}`, () => {
				expect(parseSnowflake(input)).toBe(output);
			});
		});
	});
});
