import { isEmpty } from "../../build/index.js";

describe("json", () => {
	describe("isEmpty", () => {
		const deleted = { a:"A" };
		delete deleted.a;

		const added = {};
		added.a = undefined;

		const tests = [
			[{}, true],
			[{a:undefined}, true],
			[{a:null}, false],
			[deleted, true],
			[added, true],
			[{a:""}, false],
			[{"":""}, false],
			[{"":null}, false],
			[{0:null}, false],
		];

		tests.forEach(([input, output]) => {
			test(`isEmpty(${JSON.stringify(input)}) === ${output}`, () => {
				expect(isEmpty(input)).toBe(output);
			})
		});
	});
});
