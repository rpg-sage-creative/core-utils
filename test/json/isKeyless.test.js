import { isKeyless } from "../../build/index.js";

describe("json", () => {
	describe("isKeyless", () => {
		const deleted = { a:"A" };
		delete deleted.a;

		const added = {};
		added.a = undefined;

		const tests = [
			[{}, true],
			[{a:undefined}, false],
			[{a:null}, false],
			[deleted, true],
			[added, false],
		];

		tests.forEach(([input, output]) => {
			test(`isKeyless(${JSON.stringify(input)}) === ${output}`, () => {
				expect(isKeyless(input)).toBe(output);
			})
		});
	});
});
